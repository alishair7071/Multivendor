import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/styles';

const DropDown = ({categoriesData, setDropDown}) => {

    const navigate= useNavigate();

    const submitHandle= (i)=>{
        navigate(`/products?category=${i.title}`);
        setDropDown(false);
        window.location.reload(true);
    }    

  return (
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm">
        {categoriesData && categoriesData.map((i, index)=>(
            <div 
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={()=> submitHandle(i)}>
                <img src={i.images}
                style={{
                    width: "25px",
                    height: "25px",
                    objectFit: 'contain',
                    marginLeft: "10px",
                    userSelect: 'none'
                }} alt={i.name} />
                <h3 className='m-3 cursor-pointer select-none'>
                    {i.title}
                </h3>
            </div>
        ))}
    </div>
  )
}

export default DropDown;