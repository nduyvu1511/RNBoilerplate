export const Regex = {
  phone: /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64Reader: /^data:image\/\w+;base64,/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  http: /^([A-Za-z\-]+):\s*(.*)$/,
  html: /<[a-z][\s\S]*>/i,
  imageFormat: /(.+)\.(jpg|jpeg|png|gif)$/i,
}
