export type Roles = string[] | undefined

export interface User {
  login: string
  fullName: string
  groupId?: number
  roles?: Roles
}
