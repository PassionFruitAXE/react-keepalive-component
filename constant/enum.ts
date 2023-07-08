export enum Status {
  /**缓存创建状态 */
  CREATED,
  /**缓存激活状态 */
  BEING_ACTIVE,
  /**激活完成状态 */
  ACTIVATED,
  /**缓存休眠状态 */
  BEING_INACTIVE,
  /**休眠完成状态 */
  INACTIVE,
  /**缓存销毁状态 */
  DESTROYING,
  /**销毁完成状态 */
  DESTROYED,
  /**清除缓存 */
  CLEAR,
  /**更新组件 */
  UPDATE,
}
