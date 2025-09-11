type Props = {
  children: React.ReactNode;
};

export default function Menu({children} :Props){
  return(
    <div className="absolute bottom-4 right-4">
        {children}
    </div>
  )
}