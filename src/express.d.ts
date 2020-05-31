// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User as UserDocument } from './definitions'

declare global {
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface User extends UserDocument {}
    }
}
