class generateKeys {
   constructor(length) {
      this.length = length;
      this.getKey = this.getKey.bind(this);
   }
   getKey() {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let key = "";
      for (let i = 0; i < this.length; i++) {
         key += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return key;
   }
}

const generator = new generateKeys(7);

export default generator;
