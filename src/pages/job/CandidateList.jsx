import formatDate from '../../utils/formatDate';

const Candidate = ({ candidate }) => {
  return (
    <div className="border p-6">
      <div className="flex gap-x-2">
        <span className="font-medium">Tên người ứng tuyển:</span>
        <span>{candidate.name}</span>
      </div>
      <div className="flex gap-x-2">
        <span className="font-medium">Trạng thái:</span>
        <span>{candidate.status}</span>
      </div>
      <div className="flex gap-x-2">
        <span className="font-medium">Ngày ứng tuyển:</span>
        <span>{formatDate(candidate.createdAt)}</span>
      </div>
      <div className="flex gap-x-2">
        <span className="font-medium">Link CV:</span>
        <span>{candidate.file}</span>
      </div>
    </div>
  );
};

const CandidateList = ({ candidateList }) => {
  return (
    <div>
      <h3 className="text-2xl uppercase text-gray-900 mb-6">
        Danh sách người ứng tuyển ( {candidateList?.length} )
      </h3>
      {candidateList?.length === 0 && (
        <p>Tin tuyển dụng chưa có người ứng tuyển</p>
      )}

      <div className="space-y-12">
        {candidateList?.length
          ? candidateList.map((candidate) => (
              <Candidate key={candidate.user} candidate={candidate} />
            ))
          : null}
      </div>
    </div>
  );
};

export default CandidateList;
