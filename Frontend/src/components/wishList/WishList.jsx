import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import {BsCartPlus} from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai";


const WishList = ({ setOpenWishList }) => {
  const cartData = [
    {
      name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
      description: "test",
      price: 999,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
      description: "test",
      price: 245,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
      description: "test",
      price: 645,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col shadow-sm">
        <div className="w-full flex justify-end pt-5 pr-5">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenWishList(false)}
          />
        </div>
        {/*item length*/}
        <div className={`${styles.noramlFlex} p-4`}>
          <AiOutlineHeart size={25} />
          <h2 className="pl-2 text-[20px] font-[500]">3 items</h2>
        </div>
        {/*Cart single items*/}
        <br />
        <div className="w-full border-t">
          {cartData &&
            cartData.map((i, index) => <CartSingle key={index} data={i} />)}
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price + value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer"/>
                <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABp1BMVEX////hXZbgXpnhWJHpiK3WZbfVZbnVZbvLbdnKbdvJbd1RpepPpuqyee2ue+2sfOyGjeyIjOzi7ft+jOuvuPHeUZZGnenWXrT33unkoM7SXLvGZt/w0emxcezjtOmod+vmxPHJZdffx/eFhOvQu/Tb2vh1uu4dven1UF3zUWLEce2VhuxHqurbYanRaMi6de31TlmjgOw0s+rdYKPOas7SZ8MkuunyP1Qutep8kuvt+f3wU2rtVXLrVnnpWIDmWodxl+tmnOvCaOqTeev6u8H87vPcW6Lrs9jdm9r14vXMhe7AZOz29P2RfuuhnO/K5vl8yPCg3vT4fYX5lpv92930O0n3hI31Y3D7xsv4pq771NnwQlz+7O/ybH/1l6XsSWvwe5Hzrb/rdprvm7XpiK/xu9Dpkrnjdq3hcKrxxt3jirzYUKLpqM7deLzklsrXdcXZhdHuzuzSddDhp+HZk93VhNrx2vPZoOrTlvDbrvTLm/Lgyvewie7CpfHu5/u2le/IsvOxrPLM0feos/GHsO+30vVstu1vw++t3/aG0vLL7vlgzO6a4PRiBy/RAAAMmUlEQVR4nO2Z+UMUxxLHx/CIxCMKIvex3GYFFVDADYiCC6IjR57veSVRo0ZBPBBEkENAuRb+6Mx09cyybFf17E4Ps2zm81PYb3dVfWuqe3aNpgUEBAQEBAQEBAQEBAQEBAQEBBwo9347h/HLf/0uTgX3/ncJp/O+3+Up4LdL6CM06Lzpd33u6aQMnrv0f7/rc8/9c7+Q+F2fex50kgY7f/e7QPfcvN8p5DFz+DgLDiLGQ3iIWfHCEPPo8a8Mv+vwEHD4OAsOIsYf4PCB33V4x0OY0j/9rsM7HsCY/uF3Hd4RffJrd3f3r93ZfBC7TZ488rsO7/jzCXP40O86vOMBc9j91O86vON3cNgT9bsQ7+jp7jF4cs/vOrzjqWmwp/uZ33V4x03msOep33V4Rwk47PG7Dg/puWbSk8Xv/L/A4Uu/6/COZ8zhtf/4XYd3PAKHvX7X4SGGu97ea9ey+SD2mlzL4l/Bz5nD3ud+1+Edj8DhX37X4R1RcNibxV++4SD2ZvGv4Oc5psGcLP7yPZ7DyOJ3fgk4zPG7Dg85wh/iYeFZypfii5wjJjmHhiOpWnwJDg8POS9SdFhy1u+SUyXlO+PsD4eNVB2+8rvgVPk7VYcv+UM8i/KDbMEBLeFqyv8iUcJ3lqC84JHxFSWvYck4saSdLWknVoxDJa8xnTssSdWhPtBuMoBfwpNsBdm7VywGlTzKVrS/JoKUnGVLJrAIUOhZIgJZ3cA4uuAlCz0wKY3h0iHPg52zCmjAKyICwqTMQAWd2WQCllAOB6T18UKwWZHWiTIOO/HcJbIFmvY3LKnAVzgPgg3TBC0T8O62owcx2iIdsFJpdu4QO2Qmr+hBeN0umxM8covJG/wBML2FuIuMCWIrKIdvWBDKIaR5g6SJDoCezj9HvIOt+IC/htRE9yZhhTuHsOINolbIA6CMt0j2TsgesjYIIQbxFbzAd/gK3oMWRJ6UPQeCkhYytHHKwCFRv9zhONRfiq+QPKQJ6ZgQtEimcPCNrH3jTlcQDiUr+GNI56Kx2lOMPoGKYtmEjbMVxUT9g7CC6MFkMVVFlJ5hCYPFuQbF6EEsAf0tHqECVhA94DmIOX4HK5AxHJfWQDHEducWowtkutUDuUPiGL2FJMgYlko7RMIdvCtFyAUdk0tLof+5b/EVUH/uBL4ilyyCq8R9TjLBLWLk5tK6gxVuQ3Ax3f/9MGiFz3R+TNOgNlv246HgKHHQafSjh4OydC8aTfvgd+3OKEv3ojHu4jIeAuEoLXu/gIt62g4ryq6YvK8QMwXyFUQ2FoB+dApd8R5WyBaUDQrFQV5f2ga1KOS/gvVIImsaN4Bf5u4WcIe30N1yeAexOf8A8lB69RnosgV0j2/xB4zml3PrghniQhUm0w0wWgD70RbosimIknP4XtZhOVMXGB8QeRrkELr/AyzAHYL+EQ1QQRUQBZE4JXKGIMYFRB4EdRrdP+PWYQgWiE8aad8pEOMyUuLUZSbPoNtvwf5ZTI9eljisggDiY1JF2XfKzGVGSKwOgfoJ3X4LFhAOTS5IA0xRxYlFp4QgCPKUoMDLH9GDQBao2S3C5+wD1SLQsAFzyFANRBGr+kdQ0ct+mhwBOzzukEoQJWtzDN2nT0ysQbsIDmtCmD5bQ42IAWViqkZyRpwxQ9bIVXQKq1gRNdj71CoSdbgMuvgmqsoztTz8JncG1JiH1DBdQz8jZw7z0NsQnnGe+DF9yqPb65DZmjwT5D4PMbUGbaOnOlRWs4zW7gw9D5iuEvEZxE9C0WBGjT4j0qZ5ZS4NmrMArRKTR6pSPc+NDgp+Szll2k6TkeBn3DFT5T9lMuVuLxrjwj6W0ZS7+WHByfPbBMlt9wa1z+UQq1wIpdkyqktkKjqX3F80xjuJBwuJAPvlc0IxFKqCrT8hcug2lDmPyFR0vtX9RWMcRHBYLhSneA3IXh22oqM0B9ux77VV5biL26ChP8xSAaaiTxhrqI+JmAUdJuwYdh3chtDY15I5kEOiyHxYFVw0Rp6wibiTeh8T+5Ct+jEm4w5ht0QW9XYWEqu4aIyDCMHEk9jnpMYwJocdORTJVZD4s6R2ZwxBsDBVBHaSJA8pTE9AGO/PF9gZokt3CE8kdgEj3Id9s+AOsYNGz/gyMYlhfIDTYI7o13wf2UtweAdzeId0OIsfDx123qELdwy4CH8RafyQziNboTl3kCHmdYrn344tOmtTKi8a+t5aoK4h+/Ejw8QdXkQ2z8Nm0SVeRTc2VfSLDOGJX+5jGtbML2FTxY6ps80LAmmOSeFaefHOuA0ORan0MNhHdn4Oozs1qcM5SCsacUiK3mApM19pxqsUzsRJSIa8D/hOxOEsUy9iIw6NvSiwsVxJ9jV1FiDgokhbZFIl0s0VcIhME3covMLsw3FSIE3RrUkdHQJW1iazwB3OLwjE2oUvUOUXsTrPOydUa+tBPYmGFQ9Vevx8klEp4CQuxWVaxWRCBQEZ/nRYsrJlFNjRSIeFjHS4qOSnE7Bc+XPmUf1VnUFNO5WBVNerdLhUzaMmcwpVpGq6W7nQoNJhLURdrE9mEdKtCKT6+pVT6D6Dr6AuidVq/qSS4d4VXjTGQaxuNTgleucvnTIlpKF8H3JilqqJrTpsbUWDChQX6IutLKqgbSvgUPy1ZZmJrZjDVsJhQzW2dQGUJafFOwOK6Re8Y2v7mbQi3KYzrVX4fU/TvoJD8bQtoHF5Lcp+WAD1rVjfGvqJjjpx2C92WI/6gHnqV3rR2D4EM7OMKibgEDkyvFTxi3sJ9QEJ+x1W7hT9PFaNfpcp58X7wOBdsYjGNEEfMG82kjB9vt49byBqKRPOIy0lxfMOxGT7Cyzm3VWHhTumHuKuYKXcFZ8mtM49O4WaDr0RPKlVqEThDwugATIKjtswZBQffG6Cciget2XIN4yGVPq+N+E9FTS8HoQ14bZhohydcsg7mjyL1i6FPyw4vHXJj2oNahF/D3bgMF+4kUddSRIa0IfrllWopxBLKT75sKtOOMLcobjWQtiYfNpgZJB0rlirYymT61nGBJPVOtxhehu5ID4UrtDr8hkN+1kDoS5JMFllYl2hSIONdcPCjcMgriUJUEWd8otG0wvzeewkUEGipbeRC6ovGr3QDp0ZqL5oGk5nlr/8/OQLzxVr+aczDPHVlTYNZ06fyTSUHkPdbzcC1L4rVs9cZZw5M/ytMDNQ+6posAyuFiiNmzmscoOKb6/MQQeDV7/5XYhnNHCH6n+sZAqFV68bXM3aGdW0b9eZQ8X/dJdJfAeH2XqPapbD64HDQ8y/weENg6x2eOPf4fBG4PAQk/0OG8Hhut91eMc6OPzudx3eUVAEjPhdiHcc5xaz9ySuF2X9UywqOm5SVPR9vSCzUOVwBBwyk5nFRkSRxUbbYqZxQpFDrdFvJxjq7obGohMZyXF1t9+I317EFKk6iCbrzWbI5j2c2PeBoqqJDEkpFH+XLFgfbdybrHmjcaN5TwEbjSrY2JdhY6/HfWs9eENH4snW2dsoUjAaT68kRTze6AibwchW3LT3XzrsXKPxzyL2g91SkGHEnog97/Mt26KCDM7SJ/bSbruCcy9ooUGByiZSbAgNxi26z2/1cHPf57ZF1xlIrDTbSQq33uY6RSNmxBpUb0/iNurDar3b78LWTSYYhjbR9Kpms80knj4SsQ9e2z4pTUaaIZD9QTxDkuQBEUjRZj2o0bbmNsvSFkhuO7ydGGbEyGD9t5Vd5beY/ezLAdXwcxEDaf8FkSqjEIb3rSAhJkxQW8xlCoqCBBcR0V9uZyjRxWjCzPC/vLxqhA67Ev5S5DDRU6Lfg3OodbG/+Jsj0W/abCa4GEs4FZveO4x0ATzjVpvh0fpjpM1UXJ/DbQizZSU0LY1xDZJ7eg61jsQcsc3Nbetm24b8yd8FUmMLMthX8vbmpvXMIm0J/fWGUdwGf7xu34exLtQG72GHyww0W2j+Mbyy1OhCm4grCol0dZh07SQJHUCSkDLbPEXSaUMFteyAkf2NjDR1qEof6+LN2jcNY/zzJtcZaKxn1ZFg0TKoJP2OlSKhW9vCT73AztQUTzXWoTJ9zI4W72LMtu3+GMgwHlcTw/A4FjN+W8RMz/wjNZfAmJ2hY2fLSBEba7IzNHn6qgBiTRYdfDbtD1QdkZ14Ckhgp/B+Rk1ieywloqy/O0iCjjH5XhXExOl3FA4QYtHrf4WyiYgKUHsF7IoMHsiIYgXsqM4eS+riruIMEiK7nvozSfS4ewCXaFIFuztmDTvbW14ljxgpzAw7uwc5nwEBAQEBAQEBAQEBAQEBAQEBAQ75BygWxCbHvxyzAAAAAElFTkSuQmCC"
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
            <BsCartPlus size={20} className= "cursor-pointer" title= "Add to cart" />
        </div>
      </div>
    </div>
  );
};

export default WishList;
