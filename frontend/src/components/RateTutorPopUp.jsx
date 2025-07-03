import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const RateTutorPopup = ({ isOpen, onClose, tutorId }) => {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setScore(0);
      setComment('');
    }
  }, [isOpen]);

  const submitRating = async () => {
    if (score < 1 || score > 5) {
      toast.error('Vui lòng chọn điểm từ 1 đến 5');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://localhost:7211/api/tutors/${tutorId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tutorId, score, comment }),
      });

      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Lỗi gửi đánh giá');
      }

      toast.success('Đánh giá thành công!');
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl z-50"
          >
            <Dialog.Title className="text-xl font-bold mb-4 text-center">Đánh giá giáo viên</Dialog.Title>
            <div className="mb-3">
              <label className="font-medium">Điểm đánh giá (1–5):</label>
              <input
                type="number"
                min={1}
                max={5}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full mt-1 p-2 border rounded-xl"
              />
            </div>
            <div className="mb-4">
              <label className="font-medium">Nhận xét:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full mt-1 p-2 border rounded-xl"
                placeholder="Nhập nhận xét của bạn..."
              ></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
              >
                Hủy
              </button>
              <button
                onClick={submitRating}
                disabled={loading}
                className={`px-4 py-2 rounded-xl text-white ${
                  loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } transition`}
              >
                {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
              </button>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default RateTutorPopup;
