/*var x=[10,20,30,40];
var y=x.map(double);
console.log(y);
var z=x.map(t10th);
console.log(z);
function double(x)
{
    return x*2;
}
function t10th(y)
{
    return y*10;
}
console.log(x);*/
var obj=[
    {fname:"vaibhav",lname:'singh'},
    {fname:"tarun",lname:'kumar'},
    {fname:"paurash",lname:'chauhan'}
];
console.log(obj);
console.log(`
 `);
var n=obj.map(Testm);
console.log(n);
function Testm(r)
{
    return r.fname;
}
var smane=obj.map(lanmefun);
console.log(smane);
function lanmefun(lsnm)
{
return lnm.lname;
} 
