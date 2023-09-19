var vlue=false;
let x=new Promise(function(suss,fail){
if(vlue)
{
    suss("done");
}
else
{
    fail("no donemo");
}

}
);

console.log(x);