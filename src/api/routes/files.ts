import * as express from 'express'
import * as files from '../services/files'

import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'

let s3: aws.S3 = new aws.S3({ 
    endpoint: process.env.S3ENDPOINT,
    accessKeyId: process.env.S3ACCESSKEYID,
    secretAccessKey: process.env.S3SECRETACCESSKEY,
    sslEnabled: false,
    s3ForcePathStyle: true, // needed with minio
    signatureVersion: 'v4'
})

var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'listings-images',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => { cb(null); },
      key: (req, file, cb) => { cb(null, Date.now().toString()) }
    })
  })
   

const router = express.Router()

/**
 * Retrieves an image specified by the Image ID given.
 */
router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
        id: req.params.id
    }

    async function getBucketObject (bucket: string, objectKey: string): Promise<aws.S3.GetObjectOutput> {
        try {
            const params = {
                Bucket: bucket,
                Key: objectKey 
            }
            const data: aws.S3.GetObjectOutput = await s3.getObject(params).promise();
            console.log('data:', data)
            return data
            //return data?.Body?.toString('utf-8');
        } catch (e) {
            throw new Error(`Could not retrieve file from S3: ${e.message}`)
        }
    }
    try {
        let data = await getBucketObject('listings-images', req.params.id)
        res.status(200)
            .set("Content-Length", data.ContentLength?.toString())
            .set("Content-Type", data.ContentType)
            .send(data.Body)
        
        //const result = await files.getFile(options)
        //res.status(result.status || 200).send(result.data)
    } catch (err) {
        next(err)
    }
})

/**
 *
 */
router.post('/', 
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        let buckets: string[] = ["listings-images"]
        for(const bucket of buckets) {
            var bucketParams = {
                Bucket : bucket,
                ACL: 'public-read'
            };
            
            // call S3 to create the bucket
            try {
                const data = await s3.createBucket(bucketParams).promise()
                console.log("Success", data);
            } catch (err) {
                console.log("Error", err);
                next(err)
                return
            }
        }
        next()
    },
    upload.single('image'), async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
        body: req.body
    }
    res.status(200).send('Successfully uploaded')

    // try {
    //     const result = await files.uploadFile(options)
    //     res.status(result.status || 200).send(result.data)
    // } catch (err) {
    //     res.status(500).send({
    //         status: 500,
    //         error: 'Server Error'
    //     })
    // }
})

export default router
