import './styles.css'

const Display = ({show})=> {
    return(
      <>
      {show ?
      
      <h2>Requisição completa</h2>
      :
      
      <h1>Requisição falhou</h1>
    
}</>
    )
}

export default Display