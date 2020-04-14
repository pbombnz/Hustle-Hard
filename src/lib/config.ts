import * as path from 'path'
import * as yamlConfig from 'node-yaml-config'

const config = yamlConfig.load(path.join(__dirname, '../../config/common.yml'))
export default config
