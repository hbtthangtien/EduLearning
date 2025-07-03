import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const RateTutorPopup = ({ isOpen, onClose, tutorId }) => {
  const [score, setScore] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setScore(0);
      setComment('');
      setHovered(null);
    }
  }, [isOpen]);

  const submitRating = async () => {
    if (score < 1 || score > 5) {
      toast.error('Vui lòng chọn điểm từ 1 đến 5');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://edusyncc-f8atbbd5ene8a3c9.canadacentral-01.azurewebsites.net/api/student/add/rate`, {
        
        method: 'POST',
        headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${token}`, },
        body: JSON.stringify({ tutorId, score, comment }),
      });

      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Lỗi gửi đánh giá');
      }

      toast.success('✨ Đánh giá thành công!');
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
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-3xl shadow-2xl p-8 max-w-md w-full z-50"
          >
            <Dialog.Title className="text-2xl font-bold text-center mb-6 text-blue-700">
              ✨ Đánh giá giáo viên
            </Dialog.Title>

            <div className="mb-4 text-center">
              <label className="block text-lg font-medium mb-2">Chọn số sao:</label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`w-8 h-8 cursor-pointer transition ${star <= (hovered || score)
                      ? 'text-yellow-400 drop-shadow'
                      : 'text-gray-300'
                      }`}
                    onClick={() => setScore(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(null)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-lg font-medium mb-1">Nhận xét của bạn:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Ví dụ: Thầy cô dạy rất nhiệt tình, dễ hiểu..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
              >
                Hủy
              </button>
              <button
                onClick={submitRating}
                disabled={loading}
                className={`px-6 py-2 rounded-full font-semibold text-white shadow ${loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
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
