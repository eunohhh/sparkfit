const PlaceItem = ({ place }) => {
  return (
    <div key={place.id} className="flex gap-8 bg-[#ffffff] p-8 shadow-lg rounded-xl relative">
      {/* 모임 이미지 */}
      <div>
        <img src="http://via.placeholder.com/300x200" alt="모임이미지" className="h-full" />
      </div>
      {/* 모임 설명 */}
      <div className="w-full flex flex-col gap-5">
        {/* 모임 제목/해시태그/버튼 */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl mb-3 font-semibold">{place.gather_name}</h2>
            <ul className="flex gap-2.5">
              <li className="rounded-full bg-[#efefef] px-5 py-1.5 line-height-none text-xs">{place.sports_name}</li>
              <li className="py-1.5 line-height-none text-xs">{place.region}</li>
              {/* <li className="py-1.5 line-height-none text-xs">멤버 50</li> */}
            </ul>
          </div>
          <div className="md:block sm:hidden">
            <button className="min-[320px]:hidden transition-all duration-300 ease-in-out bg-[#efefef] rounded-lg px-8 py-3 text-sm text-[#2e2e2e] hover:bg-[#dddddd]">
              상세보기
            </button>
          </div>
        </div>

        <p className="text-sm md:w-[80%] sm:w-full overflow-hidden text-ellipsis line-clamp-2 ">{place.texts}</p>
        <p className="text-[#cccccc] text-xs">{`* 모집기간 ${place.deadline}`}</p>

        <div className="sm:block md:hidden">
          <button className="w-full transition-all duration-300 ease-in-out bg-[#efefef] rounded-lg px-8 py-3 text-sm text-[#2e2e2e] hover:bg-[#dddddd]">
            상세보기
          </button>
        </div>
      </div>
      <svg className="absolute w-[25%] h-[25%] right-[-14%] top-[33%] fill-[#ffffff] rotate-90" viewBox="0 0 100 100">
        <polygon points="50,0 100,100 0,100" />
      </svg>
    </div>
  );
};

export default PlaceItem;
