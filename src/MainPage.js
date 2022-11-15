import useFacts from "./hooks/useFacts";

function MainPage() {
  const [catFact, error] = useFacts();
  const [catFact2, error2] = useFacts();
  const [catFact3, error3] = useFacts();

  if (error || error2 || error3) return "Error occured";
  return (
    <div>
      {catFact && <div>{catFact.fact} {console.log(catFact)}</div>}
      {catFact2 && <div>{catFact2.fact} {console.log(catFact2)}</div>}
      {catFact3 && <div>{catFact3.fact} {console.log(catFact3)}</div>}
      {console.log("RERENDER")}
    </div>
  );
}

export default MainPage;