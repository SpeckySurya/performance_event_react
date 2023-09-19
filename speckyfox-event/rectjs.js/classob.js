class Test
{
    constructor()
    {
        console.log("vaibhav G");
    }
    msg(ch)
    {
        console.log("hi kumar "+ch);
    }
    static s()
    {
        console.log("static");
    }
}
var obj=new Test();
obj.msg("vaibhav");
Test.s();