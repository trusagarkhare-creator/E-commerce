const { json } = require("express");

class apiFeature {
    constructor(query,queryStr)
    {
        this.query=query
        this.queryStr=queryStr
    }
    search()
    {
        const keyword = this.queryStr.keyword?{
            name:
            {
                $regex:this.queryStr.keyword,
                $options:'i'
            },

        }:{};

        
        this.query=this.query.find({...keyword})
       
        return this
    }
    filter()
    {
        // for categary
        const queryCopy={...this.queryStr}
      
        let remove=["keyword","limit","page"]
console.log(queryCopy)
        remove.forEach((key)=>{
            delete queryCopy[key]
        })


          // for price and rating  


          let querystr=JSON.stringify(queryCopy)
          querystr=querystr.replace(/\b(gt,gte,it,ite)\/b/g,key=>`$${key}`)


        this.query=this.query.find(JSON.parse(querystr))
       
        return this


      
        
    }
    // search from pages number
    pagination(resultPerPage)
    {
        
   
        const currentPage=Number(this.queryStr.page)||1
       const skip=resultPerPage*(currentPage-1)
       this.query= this.query.limit(resultPerPage).skip(skip)
       return this

    }
}
module.exports=apiFeature