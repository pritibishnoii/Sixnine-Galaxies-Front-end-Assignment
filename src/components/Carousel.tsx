import { IoCartOutline } from 'react-icons/io5';

type CarouselProps = {
  products: { image: string; name: string; price: number }[];
  startIdx: number;
  visibleCount: number;
};

const Carousel = ({ products, startIdx, visibleCount }: CarouselProps) => {
  return (
    <div className="w-full h-max px-4 md:px-12 relative py-8 md:py-12 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${startIdx * (100 / visibleCount)}%)` }}
      >
        {products.map((item, index) => (
          <div
            className="flex-shrink-0 w-[calc(100%/1)] md:w-[calc(100%/3)] px-2 md:px-6"
            key={item.name + index}
          >
            <div className="relative">
              <img
                src={item.image || 'product1'}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="flex justify-between items-center bg-[#FEFFF4] rounded-lg absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 w-[90%] md:w-4/5 h-max px-4 md:px-6 py-3 md:py-2 shadow-lg">
                <div className="flex flex-col gap-1 md:gap-2">
                  <h2 className="text-sm md:text-md text-[#2D3B36] font-medium">{item.name}</h2>
                  <p className="text-xs md:text-sm text-[#2D3B3680]">
                    FROM ${item.price.toFixed(2)}
                  </p>
                </div>
                <span className="bg-[#2D3B361A] rounded-lg w-10 h-10 md:w-12 md:h-12 flex justify-center items-center hover:bg-[#2D3B36] hover:text-white transition-all duration-300 cursor-pointer">
                  <IoCartOutline className="w-5 h-5 md:w-6 md:h-6 text-[#2D3B36] hover:text-white transition-colors duration-300" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
