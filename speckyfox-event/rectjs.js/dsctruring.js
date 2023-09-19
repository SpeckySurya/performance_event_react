let arr1=[10,20,30];
let [a,b,...rest]=arr1;
console.log(a,b,arr1,rest);
let [...all]=["vaibhav",'singh'];
console.log(all);

var student={
    name:"vaibhav",
    age:22,
    cource:"mca"
}
            console.log({...student,age:10});