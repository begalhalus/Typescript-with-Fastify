require("dotenv/config");

class Function {
  public static generatechar = (length: any): any => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  public static delay = (ms: any): any => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
}

export default Function;
