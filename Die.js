export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="dice" style={styles} onClick={props.holdDice}>
      <h3 className="die-value">{props.value}</h3>
    </div>
  );
}
