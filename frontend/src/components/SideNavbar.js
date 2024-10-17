import React from 'react'


const SideNavbar = () => {
  return (
    <div style={{
        background:"grey",
        height: '100vh', 
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        rowGap: 20
        }}>
        
        <div style={{height:"200px", width:"200px", backgroundColor:"red", display: "flex", alignItems:"center",justifyContent: "center", flexDirection:"column"}}>
            <div style={{height:"120px", width:"120px", backgroundColor:"blue", borderRadius:"50%"}}>
            </div>
            <h2>Users Name</h2>
        </div>
        <div style={{height:"200px", width:"200px", backgroundColor:"red", display: "flex", alignItems:"center",justifyContent: "center", flexDirection:"column"}}>
            <div style={{height:"120px", width:"120px", backgroundColor:"blue"}}>
            </div>
            <h2>Messages</h2>
        </div>
        <div style={{height:"200px", width:"200px", backgroundColor:"red"}}>
            
        </div>
        <a><p>Sign Out</p></a>
    </div>
  )
}

export default SideNavbar