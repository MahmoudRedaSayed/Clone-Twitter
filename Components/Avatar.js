import EditableImage from "./EditableImage";

export default function Avatar({src,big,onChange,editable=false}) {
  const widthClass = big ? '200px' : '100px';

  return (
    <div style={{borderRadius:"50%",overflow:"hidden"}}>
      <EditableImage
        type={'image'}
        src={src}
        onChange={onChange}
        editable={editable}
        style={{borderRadius:"50%",overflow:"hidden",width:widthClass}} />
    </div>
  );
}