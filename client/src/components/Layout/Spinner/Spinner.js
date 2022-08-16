import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = (props) => {

  return (
    <div className="sweet-loading" style={{display:'flex', alignItems:'ceter'}}>
      <ClipLoader cssOverride={{height: '20px', width:'20px'}}/>
    </div>
  );
};
