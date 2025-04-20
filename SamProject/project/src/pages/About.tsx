import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Mic, MessageSquare, Users, Map, Award, Heart, Compass } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-16 md:py-24">
        <div className="container-narrow text-center">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            About Tamil Nadu Heritage Explorer
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-neutral-200 mb-0 max-w-3xl mx-auto"
          >
            Discover the rich cultural tapestry of Tamil Nadu through immersive, intelligent digital experiences
          </motion.p>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container-narrow">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold mb-4">
              Our Mission
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We are dedicated to preserving and promoting the rich cultural heritage of Tamil Nadu through technology and innovation. Our goal is to make Tamil Nadu's historical and cultural treasures accessible to everyone, everywhere.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={itemVariants} className="flex">
              <div className="mr-4 text-primary-700">
                <Heart size={36} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Passion for Heritage</h3>
                <p className="text-neutral-600">
                  We are driven by a deep passion for Tamil Nadu's rich cultural heritage and a commitment to ensuring it remains vibrant and accessible for future generations.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex">
              <div className="mr-4 text-primary-700">
                <Globe size={36} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                <p className="text-neutral-600">
                  We aim to share Tamil Nadu's cultural treasures with the world, breaking down geographical barriers through digital technology and multilingual support.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex">
              <div className="mr-4 text-primary-700">
                <Award size={36} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Authentic Experience</h3>
                <p className="text-neutral-600">
                  We're committed to providing historically accurate, culturally sensitive, and deeply engaging content that honors the true essence of Tamil culture.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex">
              <div className="mr-4 text-primary-700">
                <Compass size={36} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-neutral-600">
                  We leverage cutting-edge technology like AI, voice recognition, and immersive digital experiences to make heritage exploration interactive and accessible.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-wide">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold mb-4">
              Key Features
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our platform combines the latest technology with deep cultural expertise to create a unique heritage exploration experience.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary-700/10 text-primary-700 rounded-full mb-4">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Multilingual Support</h3>
              <p className="text-neutral-600">
                Experience our platform in multiple languages including Tamil, Hindi, English, and more regional dialects.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary-700/10 text-primary-700 rounded-full mb-4">
                <Mic size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Voice Assistance</h3>
              <p className="text-neutral-600">
                Interact with our platform using voice commands and listen to rich, narrative descriptions of heritage sites.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary-700/10 text-primary-700 rounded-full mb-4">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Chatbot</h3>
              <p className="text-neutral-600">
                Ask questions and get personalized recommendations from our AI-powered heritage assistant.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary-700/10 text-primary-700 rounded-full mb-4">
                <Map size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Database</h3>
              <p className="text-neutral-600">
                Explore detailed information on hundreds of heritage sites across Tamil Nadu with rich media content.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container-narrow">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold mb-4">
              Our Team
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We are a diverse team of historians, technologists, linguists, and cultural enthusiasts dedicated to preserving and promoting Tamil Nadu's rich heritage.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex items-center justify-center mb-12"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-center">
                <Users size={64} className="text-primary-700" />
              </div>
              <p className="text-center mt-4 text-neutral-600">
                Our diverse team combines expertise in history, technology, and cultural heritage to create an exceptional exploration platform.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="font-bold mb-2">Cultural Experts</h3>
              <p className="text-neutral-600">
                Historians and cultural specialists who research and verify all heritage information for accuracy and cultural sensitivity.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="font-bold mb-2">Technology Team</h3>
              <p className="text-neutral-600">
                Engineers and designers who build innovative features like voice assistance and the AI-powered chatbot.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="font-bold mb-2">Language Specialists</h3>
              <p className="text-neutral-600">
                Linguists who ensure our content is accurately translated and culturally appropriate across multiple languages.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-narrow text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold mb-4">
              Ready to Explore Tamil Nadu's Heritage?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl mb-8 text-neutral-200 max-w-2xl mx-auto">
              Start your journey through Tamil Nadu's rich cultural tapestry with personalized guidance and immersive experiences.
            </motion.p>
            <motion.div variants={itemVariants} className="flex justify-center gap-4 flex-wrap">
              <Link to="/signup" className="btn btn-accent text-lg px-8 py-3">
                Sign Up Now
              </Link>
              <Link to="/explore" className="btn btn-outline text-white border-white hover:bg-white/10 text-lg px-8 py-3">
                Explore Heritage Sites
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;