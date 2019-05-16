var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var sqlFun = require('../library/connection')
var fs = require('fs')
var pathData=[],num=0,img_src_arr=[]
router.post('/', function (req, res) {
    var form = new formidable.IncomingForm(),filename,randomName,newPath,sql,data;
    form.encoding = 'utf-8';
    form.uploadDir = 'public/images/';
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    randomName = Math.random().toString(36).substr(2)
    //处理图片
    form.parse(req, function (err, fields, files){
        console.log(fields.length);
        filename = files.file.name
        newPath = form.uploadDir + randomName + '_' + filename;
        pathData[num] = {path:files.file.path,name:randomName + '_' + filename};
        img_src_arr[num] = 'images/'+randomName + '_' + filename;num++
        console.log(pathData)
        // res.send({data:newPath})
        if(Number(fields.length) === pathData.length){
            sql = `SELECT * FROM img`
            sqlFun(sql, '',(error, results, fieldsThis) => {
                if (error) {
                    return console.error(error.message);
                }
                fields.select = results.filter((item)=>{return item.name === fields.name[0]})
                if(fields.select[0]){
                    console.log(fields.select[0].img_src_arr)
                    fields.img_src_arr = fields.select[0].img_src_arr ? fields.select[0].img_src_arr+',' : ''
                    sql = `UPDATE img
                        SET img_src_arr = ?
                        WHERE id = ?`;
                    data = [fields.img_src_arr+img_src_arr.join(','), fields.select[0].id];
                    console.log('UPDATE Id:' + data);
                }else {
                    sql = `INSERT INTO img(title,name,introduce,img_src,img_src_arr)
                           VALUES(?,?,?,?,?)`;
                    data = [fields.title,fields.name, fields.introduce,img_src_arr[0],img_src_arr.join(',')]
                    console.log('INSERT Id:' + data);
                }
                // res.status(200).json({msg:'上传成功',data:results});

                sqlFun(sql,data,(error, results, fields)=>{
                    // library = `SELECT * FROM img
                    //        WHERE name=?`;
                    // console.log(name)
                    // sqlFun(library,name,(error, results, fields)=> {
                    //     res.status(200).json({msg:'上传成功',data:results});
                    //     pathData=[],num=0,img_src_arr=[];
                    //     console.log(results,num)
                    // })
                    pathData.forEach((item,index)=>{
                        console.log(item.path)
                        fs.renameSync(item.path, 'public/'+img_src_arr[index]);  //重命名
                        // images(item.path) //Load image from file
                        // //加载图像文件
                        //     .size(1920) //Geometric scaling the image to 400 pixels width
                        //     //等比缩放图像到400像素宽
                        //     //在(10,10)处绘制Logo
                        //     .save('public/images/'+item.name, { //Save the image to a file,whih quality 50
                        //         quality: 80 //保存图片到文件,图片质量为50
                        //     });
                    })
                    res.status(200).json({msg:'上传成功',data:results});
                    pathData=[];num=0;img_src_arr=[];
                },'end')
            });
        }else {
            res.status(200).json({code:200,msg:'上传成功'})
        }
    })


    // let form = new multiparty.Form(),sql,data,name,randomName;
    // form.parse(req, function(err, fields, files) {
    //     console.log(fields)
    //     name = fields.name[0]
    //     randomName = Math.random().toString(36).substr(2)
    //     pathData[num] = {path:files.file[0].path,name:randomName+files.file[0].originalFilename}
    //     img_src_arr[num] = 'images/'+randomName+files.file[0].originalFilename;num++
    //     console.log(Number(fields.length[0]) === img_src_arr.length,fields.length[0],img_src_arr.length,img_src_arr[0],img_src_arr.join(','))
    //     if(Number(fields.length[0]) === img_src_arr.length){
    //         sql = `SELECT * FROM img`
    //         sqlFun(sql, '',(error, results, fieldsThis) => {
    //             if (error) {
    //                 return console.error(error.message);
    //             }
    //             fields.select = results.filter((item)=>{return item.name === fields.name[0]})
    //             if(fields.select[0]){
    //                 console.log(fields.select[0].img_src_arr)
    //                 fields.img_src_arr = fields.select[0].img_src_arr ? fields.select[0].img_src_arr+',' : ''
    //                 sql = `UPDATE img
    //                     SET img_src_arr = ?
    //                     WHERE id = ?`;
    //                 data = [fields.img_src_arr+img_src_arr.join(','), fields.select[0].id];
    //                 console.log('UPDATE Id:' + data);
    //             }else {
    //                 sql = `INSERT INTO img(title,name,introduce,img_src,img_src_arr)
    //                        VALUES(?,?,?,?,?)`;
    //                 data = [fields.title,fields.name, fields.introduce,img_src_arr[0],img_src_arr.join(',')]
    //                 console.log('INSERT Id:' + data);
    //             }
    //             // res.status(200).json({msg:'上传成功',data:results});
    //
    //             sqlFun(sql,data,(error, results, fields)=>{
    //                 // library = `SELECT * FROM img
    //                 //        WHERE name=?`;
    //                 // console.log(name)
    //                 // sqlFun(library,name,(error, results, fields)=> {
    //                 //     res.status(200).json({msg:'上传成功',data:results});
    //                 //     pathData=[],num=0,img_src_arr=[];
    //                 //     console.log(results,num)
    //                 // })
    //                 res.status(200).json({msg:'上传成功',data:results});
    //                 pathData.forEach((item,index)=>{
    //                     console.log(item.path)
    //                     images(item.path) //Load image from file
    //                     //加载图像文件
    //                         .size(1920) //Geometric scaling the image to 400 pixels width
    //                         //等比缩放图像到400像素宽
    //                         //在(10,10)处绘制Logo
    //                         .save('public/images/'+item.name, { //Save the image to a file,whih quality 50
    //                             quality: 80 //保存图片到文件,图片质量为50
    //                         });
    //                 })
    //                 pathData=[];num=0;img_src_arr=[];
    //             },'end')
    //         });
    //     }else {
    //         res.status(200).json({code:200,msg:'上传成功'})
    //     }
    // });
})

module.exports = router;
