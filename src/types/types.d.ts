export { }
declare global {
  export interface BaseRespData {
    [propName: string]: any;
  }

  export interface BaseResp {
    message: string
    code: number
    data: BaseRespData
  }
}