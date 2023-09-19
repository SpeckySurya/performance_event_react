function f1()
{
    return "vaibhav";
}
function f2()
{
    return "singh";
}
function name(a,b)
{
    console.log("hello",a(),b());
}
name(f1,f2);