import Image from "next/image";

const rows = [0];
const columns = [0];

const getStyleByIndex = (index: number) => {
  let styles = '';
  if (rows.includes(index)) styles += ' row-span-1 md:row-span-2';
  if (columns.includes(index)) styles += ' col-span-1 md:col-span-2';
  console.log(styles);
  return styles
}

interface BentoGridProps {
  elements: {title: string, description: string, url: string, img?: string}[];
}

export default function BentoGrid({elements}: BentoGridProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {elements.map((item: any, index) => (
        <div key={index} className={`bg-accent rounded-md ${getStyleByIndex(index)}`}>
          <div className="h-72">
            <div>
              <Image className="w-full h-full object-cover rounded-t-md" src={item.img} alt={item.title}/>
            </div>
            <div>
              <div>{item.title}</div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}