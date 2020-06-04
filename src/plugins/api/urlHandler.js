// 引入全局请求方法
import { FINAL_SERVICE } from './request';
import { asyncCapture,getType } from '../utils/functions';

export function urlHandler(urls){
    const finalExport = {};
    urls.forEach(item => {
        let name = item.name
        if (!name || (name in finalExport)) {
            throw new Error(name+' should be required and unique,but be multiple or undefined!')
        }
        finalExport[item.name] = function (params) {
            if(getType(item.url)==='function'){
                item.url = item.url(params);
            }else{
                item.data = params;
            }
            return asyncCapture(FINAL_SERVICE[item.way],item);
        }
    })
    // console.log(finalExport)
    return finalExport;
}