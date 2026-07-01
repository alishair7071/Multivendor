//create and send token

const sendShopToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  //options for Cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "None",
    secure: true,
    path: "/",
  };

  res.status(statusCode).cookie("seller_token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendShopToken;
