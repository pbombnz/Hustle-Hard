import * as path from 'path'
// @ts-ignore
import * as yamlConfig from 'node-yaml-config'

const config = yamlConfig.load(path.join(__dirname, '../../config/common.yml'))
export default config
