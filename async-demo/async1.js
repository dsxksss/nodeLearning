console.log("之前");

const getUsers = () => {
  return new Promise((ok) => {
    setTimeout(() => {
      console.log("Database runing~ ...");
      ok([1, 2, 2, 4]);
    }, 2000);
  });
};
const start = async () => {
  console.log(await getUsers());
};
start();

console.log("之后");
