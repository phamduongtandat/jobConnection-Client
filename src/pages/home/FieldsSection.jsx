import { FaBookOpen, FaRegHandshake } from 'react-icons/fa';
import { HiCodeBracketSquare } from 'react-icons/hi2';
import {
  MdAccountBalanceWallet,
  MdDesignServices,
  MdLinkedCamera,
  MdVideoLibrary,
} from 'react-icons/md';
import { RiComputerFill, RiTranslate } from 'react-icons/ri';
import { SiBookstack } from 'react-icons/si';
import SectionContainer from '../../components/container/SectionContainer';

const Field = ({ text, icon }) => {
  return (
    <div className="flex flex-col items-center justify-between gap-y-3 group cursor-pointer">
      <span>{icon}</span>
      <span className="w-12 h-0.5 bg-gray-200 group-hover:w-24 group-hover:bg-primary transition-all duration-150"></span>
      <span>{text}</span>
    </div>
  );
};

const FieldsSection = () => {
  return (
    <SectionContainer>
      <h2 className="text-4xl font-semibold mb-16 text-center lg:text-start">
        Tìm nhân sự từ nhiều ngành nghề
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10">
        <Field text="Thiết kế & đồ họa" icon={<MdDesignServices size={64} />} />
        <Field text="Digitial Marketing" icon={<RiComputerFill size={64} />} />
        <Field text="Dịch thuật" icon={<RiTranslate size={64} />} />
        <Field text="Video" icon={<MdVideoLibrary size={64} />} />
        <Field text="Lập trình" icon={<HiCodeBracketSquare size={64} />} />
        <Field text="Kinh doanh" icon={<FaRegHandshake size={64} />} />
        <Field text="Nhiếp ảnh" icon={<MdLinkedCamera size={64} />} />
        <Field text="Viết lách" icon={<FaBookOpen size={64} />} />
        <Field text="Luật và pháp lý" icon={<SiBookstack size={64} />} />
        <Field
          text="Kế toán & tài chính"
          icon={<MdAccountBalanceWallet size={64} />}
        />
      </div>
    </SectionContainer>
  );
};

export default FieldsSection;
