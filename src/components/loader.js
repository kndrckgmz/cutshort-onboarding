import React from 'react'

const Loader = ({ size, color }) => {

    return (
        <div
            style={{
                height: `${size}rem`,
                width: `${size}rem`
            }}
            className={`loader border-2 border-[#8e8e8e82] rounded-full
        ${color === 'black'
                    ? "border-t-black"
                    : "border-t-white"
                }`} />
    )
}

export default Loader