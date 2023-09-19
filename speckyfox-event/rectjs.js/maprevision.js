var x=[10,11,12,13];
var t=x.map((value)=>{
    return value-5;
})
console.log(t);
console.log(x);

x.forEach((element,index,arr) => {
    console.log(index);
    
});