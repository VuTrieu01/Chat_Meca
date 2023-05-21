function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const Validation = (values) => {
  let errors = {};

  if (!values.lastName) {
    errors.lastName = "Họ không được để trống!!!";
  }
  if (!values.firstName) {
    errors.firstName = "Tên không được để trống!!!";
  }
  if (!values.email) {
    errors.email = "Email không được để trống!!!";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Email không hợp lệ!!!";
  }
  if (!values.password) {
    errors.password = "Mật khẩu không được để trống!!!";
  } else if (values.password.length < 9) {
    errors.password = "Mật khẩu phải lớn hơn 9 ký tự!!!";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Mật khẩu không được để trống!!!";
  } else if (values.passwordConfirm.length < 9) {
    errors.passwordConfirm = "Mật khẩu phải lớn hơn 9 ký tự!!!";
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Mật khẩu không khớp!!!";
  }
  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Ngày sinh không được để trống!!!";
  }
  if (!values.title) {
    errors.title = "Tiêu đề không được để trống!!!";
  }
  return errors;
};

export default Validation;
