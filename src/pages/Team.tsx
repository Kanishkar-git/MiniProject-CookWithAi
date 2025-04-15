import { User } from 'lucide-react';
import { motion} from 'framer-motion';


const teamMemberVariants = {
  initial: { opacity: 0, y: 50, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
};

const headingVariants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeInOut' } },
};

export default function Team() {
  const teamMembers = [
    { name: 'Kanishkar', regNo: '2117230020096' },
    { name: 'Kamalesh', regNo: '2117230020092' },
    { name: 'John Antony', regNo: '2117230020084' },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 py-12"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center text-orange-600 mb-12"
          variants={headingVariants}
          initial="initial"
          animate="animate"
        >
          Our Team
        </motion.h1>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
              variants={teamMemberVariants}
              whileHover="hover"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-4 rounded-full">
                  <User className="w-12 h-12 text-orange-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h2>
              <p className="text-gray-600">Register No: {member.regNo}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}