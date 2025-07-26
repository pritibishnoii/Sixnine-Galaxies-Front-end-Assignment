const CTAButton = ({ bgcolor, text, icon }: { bgcolor: boolean; text: string; icon: string }) => {
  return (
    <button className="bg-[#EFF5E1] text-[#2D3B36] px-2 py-2 rounded-full w-max  flex items-center gap-4 justify-between">
      <span className={`w-12 h-12 rounded-full border border-dotted border-[#2D3B36]   `}>
        {bgcolor && (
          <span className="absolute   left-3 top-3 bg-[#2D3B36] rounded-full z-0 w-10 h-10"></span>
        )}
        <img src={icon} alt="img" className={`w-full h-full object-cover p-1  `} />
      </span>

      <p className="text-[11px]  text-left  w-50 px-4">{text}</p>
    </button>
  );
};

export default CTAButton;
