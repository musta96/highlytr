
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ArrowRight, BookOpen, CheckCircle, FileText, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoDebug from '@/components/common/LogoDebug';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Categories of help articles
  const categories = [
    { id: 'account', label: 'Account & Profile', icon: <ShieldCheck className="h-5 w-5" /> },
    { id: 'athletes', label: 'For Athletes', icon: <Zap className="h-5 w-5" /> },
    { id: 'colleges', label: 'For Colleges', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'agencies', label: 'For Agencies', icon: <FileText className="h-5 w-5" /> },
    { id: 'technical', label: 'Technical Support', icon: <CheckCircle className="h-5 w-5" /> }
  ];
  
  // More detailed help articles
  const helpArticles = {
    account: [
      { 
        id: 1, 
        title: 'How to create an account', 
        description: 'Step-by-step guide for creating your HighLytr account securely',
        views: 1240,
        content: `
          <h1>How to Create Your HighLytr Account</h1>
          
          <p>Creating a HighLytr account is quick and easy. Follow these steps to get started:</p>
          
          <h2>Step 1: Visit the Registration Page</h2>
          <p>Go to <a href="/register">HighLytr.com/register</a> or click the "Sign Up" button from our homepage.</p>
          
          <h2>Step 2: Choose Your Account Type</h2>
          <p>Select whether you're registering as an athlete, college, or agency. Each account type has different features tailored to your needs.</p>
          
          <h2>Step 3: Fill in Your Information</h2>
          <p>Enter your personal details including:</p>
          <ul>
            <li>Full name</li>
            <li>Email address (use your school email if you're a college representative)</li>
            <li>Create a strong password (minimum 8 characters with letters, numbers, and special characters)</li>
            <li>Date of birth (for athletes)</li>
          </ul>
          
          <h2>Step 4: Verify Your Email</h2>
          <p>Check your email inbox for a verification link from HighLytr and click it to verify your account.</p>
          
          <h2>Step 5: Complete Your Profile</h2>
          <p>After verification, you'll be prompted to complete your profile with more specific information based on your account type.</p>
          
          <h2>Security Tips</h2>
          <p>Always use a strong, unique password for your HighLytr account and enable two-factor authentication for additional security.</p>
        `
      },
      { 
        id: 2, 
        title: 'Updating your profile information', 
        description: 'Learn how to keep your profile details current and complete',
        views: 986,
        content: `
          <h1>Updating Your Profile Information</h1>
          
          <p>Keeping your profile up-to-date is crucial for making connections on HighLytr. Here's how to manage your information:</p>
          
          <h2>Accessing Your Profile Settings</h2>
          <p>Log in to your account and click on your profile picture in the top right corner, then select "Profile Settings" from the dropdown menu.</p>
          
          <h2>Sections You Can Update</h2>
          <ul>
            <li><strong>Personal Information:</strong> Name, contact details, profile photo</li>
            <li><strong>Athletic Information:</strong> Sports, positions, statistics (for athletes)</li>
            <li><strong>Academic Information:</strong> GPA, test scores, graduation date (for athletes)</li>
            <li><strong>College Information:</strong> Programs, facilities, roster openings (for colleges)</li>
            <li><strong>Agency Details:</strong> Services, success rates, regions covered (for agencies)</li>
          </ul>
          
          <h2>Profile Completeness</h2>
          <p>Your profile completeness score appears at the top of your profile settings. Aim for 100% completion to improve visibility and attract more connections.</p>
          
          <h2>Profile Photo Guidelines</h2>
          <p>Upload a clear, professional headshot that shows your face clearly. For athletes, action shots are also acceptable.</p>
          
          <h2>Privacy Settings</h2>
          <p>Review which parts of your profile are visible to different user groups by visiting the "Privacy" tab in your profile settings.</p>
        `
      },
      { 
        id: 3, 
        title: 'Changing your password', 
        description: 'Instructions for updating your password and securing your account',
        views: 754,
        content: `
          <h1>Changing Your Password</h1>
          
          <p>Regularly updating your password helps keep your HighLytr account secure. Follow these steps to change your password:</p>
          
          <h2>Method 1: Through Account Settings</h2>
          <ol>
            <li>Log in to your HighLytr account</li>
            <li>Click on your profile picture in the top-right corner</li>
            <li>Select "Account Settings" from the dropdown menu</li>
            <li>Navigate to the "Security" tab</li>
            <li>Click "Change Password"</li>
            <li>Enter your current password</li>
            <li>Enter and confirm your new password</li>
            <li>Click "Update Password"</li>
          </ol>
          
          <h2>Method 2: If You've Forgotten Your Password</h2>
          <ol>
            <li>Go to the login page</li>
            <li>Click "Forgot password?"</li>
            <li>Enter the email address associated with your account</li>
            <li>Check your email for a password reset link</li>
            <li>Click the link and follow the instructions to set a new password</li>
          </ol>
          
          <h2>Password Requirements</h2>
          <p>Your password must be:</p>
          <ul>
            <li>At least 8 characters long</li>
            <li>Include at least one uppercase letter</li>
            <li>Include at least one number</li>
            <li>Include at least one special character (e.g., !@#$%)</li>
          </ul>
          
          <h2>Additional Security Tips</h2>
          <p>For maximum account security, we recommend:</p>
          <ul>
            <li>Enabling two-factor authentication</li>
            <li>Using a unique password for HighLytr that you don't use elsewhere</li>
            <li>Changing your password every 3-6 months</li>
            <li>Never sharing your password with others</li>
          </ul>
        `
      },
      { 
        id: 4, 
        title: 'Managing notification settings', 
        description: 'Customize which alerts and updates you receive from HighLytr',
        views: 621,
        content: `
          <h1>Managing Your Notification Settings</h1>
          
          <p>Control the type and frequency of notifications you receive from HighLytr with these simple steps:</p>
          
          <h2>Accessing Notification Settings</h2>
          <p>Log in to your HighLytr account, click your profile icon in the top right corner, and select "Settings" > "Notifications".</p>
          
          <h2>Email Notification Options</h2>
          <p>Customize which emails you receive:</p>
          <ul>
            <li><strong>Connection requests:</strong> When someone wants to connect with you</li>
            <li><strong>Messages:</strong> When you receive a new message</li>
            <li><strong>Profile views:</strong> When someone views your profile</li>
            <li><strong>Matches:</strong> New potential matches based on your preferences</li>
            <li><strong>Weekly digest:</strong> Summary of activity from the past week</li>
            <li><strong>Platform updates:</strong> News about HighLytr features and improvements</li>
          </ul>
          
          <h2>Push Notification Settings</h2>
          <p>If you use our mobile app, you can also manage push notifications:</p>
          <ul>
            <li>Open the HighLytr mobile app</li>
            <li>Go to "Settings" > "Notifications"</li>
            <li>Toggle notifications on/off for different categories</li>
          </ul>
          
          <h2>Notification Frequency</h2>
          <p>Choose how often you'd like to be notified:</p>
          <ul>
            <li><strong>Real-time:</strong> Receive notifications immediately</li>
            <li><strong>Daily digest:</strong> Receive one notification per day with all updates</li>
            <li><strong>Weekly digest:</strong> Receive a weekly summary of all activity</li>
          </ul>
          
          <h2>Temporarily Pause All Notifications</h2>
          <p>Need a break? Toggle the "Pause All Notifications" switch at the top of the page to temporarily stop all notifications without changing your individual settings.</p>
        `
      },
      { 
        id: 5, 
        title: 'Deleting your account', 
        description: 'How to remove your information from our platform if needed',
        views: 543,
        content: `
          <h1>Deleting Your HighLytr Account</h1>
          
          <p>We're sorry to see you go! If you need to delete your HighLytr account, follow these steps:</p>
          
          <h2>Before You Delete Your Account</h2>
          <p>Consider these important points:</p>
          <ul>
            <li>Account deletion is permanent and cannot be undone</li>
            <li>All your profile information, connections, and messages will be permanently removed</li>
            <li>If you're an athlete with active recruitment processes, colleges will no longer be able to contact you</li>
            <li>Consider temporarily deactivating your account instead if you need a break</li>
          </ul>
          
          <h2>How to Delete Your Account</h2>
          <ol>
            <li>Log in to your HighLytr account</li>
            <li>Click on your profile picture in the top-right corner</li>
            <li>Select "Account Settings" from the dropdown menu</li>
            <li>Scroll to the bottom of the page and click "Delete Account"</li>
            <li>Read the information about account deletion</li>
            <li>Enter your password to confirm</li>
            <li>Select a reason for leaving (optional but helpful)</li>
            <li>Click "Permanently Delete My Account"</li>
          </ol>
          
          <h2>What Happens Next</h2>
          <p>After requesting deletion:</p>
          <ul>
            <li>You'll receive a confirmation email</li>
            <li>Your account will be scheduled for deletion in 30 days</li>
            <li>During this 30-day period, you can log back in to cancel the deletion request</li>
            <li>After 30 days, all your data will be permanently removed from our systems</li>
          </ul>
          
          <h2>Downloading Your Data</h2>
          <p>Before deleting your account, you may want to download a copy of your data:</p>
          <ol>
            <li>Go to "Account Settings" > "Privacy"</li>
            <li>Click "Download My Data"</li>
            <li>You'll receive an email with a link to download your data within 48 hours</li>
          </ol>
        `
      }
    ],
    athletes: [
      { 
        id: 6, 
        title: 'Creating your athletic profile', 
        description: 'Tips for building an impressive athletic profile that stands out',
        views: 1567,
        content: `
          <h1>Creating Your Athletic Profile</h1>
          
          <p>Your athletic profile is your digital resume for college recruiters. Here's how to make it stand out:</p>
          
          <h2>Essential Profile Elements</h2>
          <ul>
            <li><strong>Clear headshot:</strong> Professional-looking photo showing your face clearly</li>
            <li><strong>Action photos:</strong> 3-5 high-quality images of you playing your sport</li>
            <li><strong>Physical stats:</strong> Height, weight, wingspan, speed metrics, etc.</li>
            <li><strong>Position details:</strong> Primary and secondary positions</li>
            <li><strong>Career stats:</strong> Key performance metrics for your sport</li>
            <li><strong>Competition level:</strong> The leagues, divisions, or tournaments you compete in</li>
          </ul>
          
          <h2>Academic Information</h2>
          <p>Colleges look for the complete student-athlete:</p>
          <ul>
            <li>GPA and academic achievements</li>
            <li>Standardized test scores (SAT, ACT, TOEFL for international students)</li>
            <li>Expected graduation date</li>
            <li>Academic interests and potential majors</li>
          </ul>
          
          <h2>Video Content</h2>
          <p>Your highlight video is crucial:</p>
          <ul>
            <li>Keep it under 5 minutes</li>
            <li>Put your best plays at the beginning</li>
            <li>Include game footage, not just practice</li>
            <li>Make sure you're easily identifiable (mention jersey number)</li>
            <li>Consider adding slower replays of key moments</li>
          </ul>
          
          <h2>Personal Statement</h2>
          <p>Write a compelling bio (250 words maximum) that includes:</p>
          <ul>
            <li>Your athletic journey and achievements</li>
            <li>Why you want to play collegiate sports</li>
            <li>What makes you unique as an athlete</li>
            <li>Your goals for college and beyond</li>
          </ul>
          
          <h2>Keep It Updated</h2>
          <p>Regularly update your profile with new achievements, improved stats, and better highlight videos to show your progression.</p>
        `
      },
      { 
        id: 7, 
        title: 'Uploading highlight videos', 
        description: 'Best practices for sharing your best moments with coaches',
        views: 1342,
        content: `
          <h1>Uploading Highlight Videos</h1>
          
          <p>Your highlight video is often your first impression with college coaches. Follow these guidelines to make it count:</p>
          
          <h2>Video Technical Requirements</h2>
          <ul>
            <li><strong>Format:</strong> MP4 or MOV</li>
            <li><strong>Resolution:</strong> Minimum 720p (1080p recommended)</li>
            <li><strong>Length:</strong> 3-5 minutes max (coaches are busy!)</li>
            <li><strong>File size:</strong> Maximum 500MB per video</li>
          </ul>
          
          <h2>Step-by-Step Upload Process</h2>
          <ol>
            <li>Login to your HighLytr account</li>
            <li>Go to your profile page</li>
            <li>Select the "Videos" tab</li>
            <li>Click "Upload New Video"</li>
            <li>Fill in the video details (title, description, date recorded)</li>
            <li>Select your sport and position</li>
            <li>Tag skills demonstrated (e.g., shooting, passing, defense)</li>
            <li>Choose a compelling thumbnail</li>
            <li>Upload your video file</li>
          </ol>
          
          <h2>Content Tips for Effective Highlights</h2>
          <ul>
            <li>Start with a brief introduction (5-10 seconds) with your name, position, graduation year</li>
            <li>Put your absolute best highlights in the first 30 seconds</li>
            <li>Include a variety of skills relevant to your position</li>
            <li>Show game footage against quality competition</li>
            <li>Include clips that demonstrate athleticism, game IQ, and teamwork</li>
            <li>Use subtle indicators (arrows, circles) to identify yourself in crowded plays</li>
          </ul>
          
          <h2>Advanced Tips</h2>
          <ul>
            <li><strong>Multi-angle views:</strong> If available, show important plays from different angles</li>
            <li><strong>Slow-motion replays:</strong> Use sparingly for especially impressive moments</li>
            <li><strong>On-screen stats:</strong> Consider adding relevant statistics for context</li>
            <li><strong>Background music:</strong> Optional, but keep it professional and not too loud</li>
          </ul>
          
          <h2>After Uploading</h2>
          <p>Share your video by copying the direct link from your profile and including it in communications with coaches or on social media.</p>
        `
      },
      { 
        id: 8, 
        title: 'Getting discovered by colleges', 
        description: 'Strategies to increase your visibility to college recruiters',
        views: 1298,
        content: `
          <h1>Getting Discovered by College Recruiters</h1>
          
          <p>Maximizing your visibility to college recruiters requires strategy and persistence. Here's how to increase your chances of being discovered:</p>
          
          <h2>Optimize Your HighLytr Profile</h2>
          <ul>
            <li>Complete 100% of your profile</li>
            <li>Update your stats and achievements regularly</li>
            <li>Add new highlight videos each season</li>
            <li>Use relevant keywords in your bio and descriptions</li>
            <li>Specify your academic interests and preferred regions</li>
          </ul>
          
          <h2>Be Proactive in Your Search</h2>
          <ul>
            <li>Research colleges that match your academic and athletic abilities</li>
            <li>Follow colleges and coaches on HighLytr</li>
            <li>Use the "Express Interest" button on college profiles</li>
            <li>Respond promptly to any coach communications</li>
            <li>Update your availability for virtual meetings or campus visits</li>
          </ul>
          
          <h2>Expand Your Digital Footprint</h2>
          <ul>
            <li>Share your HighLytr profile link on your social media accounts</li>
            <li>Include your profile link in your email signature</li>
            <li>Create a professional presence on platforms coaches use (Twitter, LinkedIn)</li>
            <li>Share game highlights and training videos regularly</li>
          </ul>
          
          <h2>Leverage Your Network</h2>
          <ul>
            <li>Ask your current coach to make recommendations or connections</li>
            <li>Connect with alumni from your school who play collegiate sports</li>
            <li>Attend showcase events and camps where college coaches will be present</li>
            <li>Consider working with a reputable recruiting agency</li>
          </ul>
          
          <h2>HighLytr Premium Features</h2>
          <p>Consider upgrading to HighLytr Premium for additional visibility tools:</p>
          <ul>
            <li>Priority placement in search results</li>
            <li>Weekly profile view analytics</li>
            <li>Direct messaging to coaches outside your network</li>
            <li>College match recommendations based on your profile</li>
            <li>Verification badge for enhanced credibility</li>
          </ul>
        `
      },
      { 
        id: 9, 
        title: 'Communicating with coaches', 
        description: 'Etiquette and tips for effective communication with coaches',
        views: 987,
        content: `
          <h1>Communicating with College Coaches</h1>
          
          <p>Effective communication with coaches can make or break your recruiting journey. Here's how to make a positive impression:</p>
          
          <h2>First Contact Best Practices</h2>
          <ul>
            <li>Keep initial messages concise (100-150 words)</li>
            <li>Introduce yourself with key details (name, position, graduation year)</li>
            <li>Mention a specific reason you're interested in their program</li>
            <li>Include your HighLytr profile link and any relevant stats</li>
            <li>End with a specific question to encourage a response</li>
          </ul>
          
          <h2>Sample Initial Message</h2>
          <blockquote>
          <p>Dear Coach Johnson,</p>
          
          <p>I'm Marco Rossi, a center midfielder from Milan, Italy, graduating in 2025. I've been following University of Washington's program for years and was particularly impressed by your team's tactical flexibility in last season's conference championship.</p>
          
          <p>I currently play for AC Milan's U19 team and maintain a 3.8 GPA. You can view my highlight reel and academic credentials at [HighLytr Profile Link].</p>
          
          <p>I'll be visiting Seattle this April. Would you have time for me to visit campus and perhaps meet with you?</p>
          
          <p>Thank you for your consideration,<br>
          Marco Rossi</p>
          </blockquote>
          
          <h2>Video Chat Etiquette</h2>
          <ul>
            <li>Test your technology before the scheduled call</li>
            <li>Choose a quiet location with good lighting</li>
            <li>Dress appropriately (team gear or business casual)</li>
            <li>Prepare 3-5 questions about the program</li>
            <li>Have your key stats and information ready to discuss</li>
            <li>Thank the coach for their time at the end</li>
          </ul>
          
          <h2>Following Up</h2>
          <ul>
            <li>Send a thank-you message within 24 hours after any interaction</li>
            <li>Follow up if you haven't heard back after 2 weeks</li>
            <li>Update coaches with new achievements or improved stats</li>
            <li>Let coaches know when you'll be competing in tournaments</li>
            <li>Be understanding of limited responses (coaches are very busy)</li>
          </ul>
          
          <h2>Communication Don'ts</h2>
          <ul>
            <li>Don't use slang or informal language</li>
            <li>Don't have your parents communicate on your behalf</li>
            <li>Don't exaggerate your achievements or statistics</li>
            <li>Don't copy and paste generic messages to multiple coaches</li>
            <li>Don't send messages daily or become pushy</li>
          </ul>
        `
      },
      { 
        id: 10, 
        title: 'Managing your academic information', 
        description: 'How to present your academic achievements alongside athletic abilities',
        views: 876,
        content: `
          <h1>Managing Your Academic Information</h1>
          
          <p>College coaches aren't just looking for great athletes—they need students who can succeed academically. Here's how to showcase your academic strengths:</p>
          
          <h2>Essential Academic Information to Include</h2>
          <ul>
            <li><strong>GPA:</strong> Both weighted and unweighted if applicable</li>
            <li><strong>Test scores:</strong> SAT, ACT, AP, IB, TOEFL (for international students)</li>
            <li><strong>Course rigor:</strong> Honors, AP, or IB classes taken</li>
            <li><strong>Academic awards:</strong> Honor roll, academic competitions, etc.</li>
            <li><strong>Intended major:</strong> Academic areas of interest</li>
            <li><strong>Graduation date:</strong> Expected month/year</li>
          </ul>
          
          <h2>Adding Academic Information to Your Profile</h2>
          <ol>
            <li>Log in to your HighLytr account</li>
            <li>Navigate to "My Profile"</li>
            <li>Select the "Academic Information" tab</li>
            <li>Click "Edit" to update your information</li>
            <li>Complete all fields with your most recent information</li>
            <li>Upload optional supporting documents (transcripts, certificates)</li>
          </ol>
          
          <h2>Academic Eligibility Requirements</h2>
          <p>Different athletic associations have different academic requirements:</p>
          <ul>
            <li><strong>NCAA Division I:</strong> 2.3 minimum GPA in core courses, sliding scale for SAT/ACT</li>
            <li><strong>NCAA Division II:</strong> 2.2 minimum GPA in core courses, 820 SAT/68 ACT sum score</li>
            <li><strong>NCAA Division III:</strong> Set by individual schools</li>
            <li><strong>NAIA:</strong> 2.0 minimum GPA, 860 SAT/16 ACT, or top 50% of graduating class</li>
          </ul>
          
          <h2>For International Students</h2>
          <p>Additional considerations for international student-athletes:</p>
          <ul>
            <li>Include English proficiency test scores (TOEFL, IELTS)</li>
            <li>Provide grade equivalency explanations if your country uses a different grading system</li>
            <li>Consider getting your transcripts evaluated by a credential evaluation service</li>
            <li>Explain any unique aspects of your educational system that coaches may not understand</li>
          </ul>
          
          <h2>Verifying Your Academic Information</h2>
          <p>HighLytr allows you to verify your academic credentials for added credibility:</p>
          <ol>
            <li>Go to "Academic Information" > "Verify Credentials"</li>
            <li>Upload official transcripts or score reports</li>
            <li>Our team will review and add a verification badge to your profile</li>
          </ol>
        `
      }
    ],
    colleges: [
      { 
        id: 11, 
        title: 'Setting up a college profile', 
        description: 'Create an appealing profile to attract potential recruits',
        views: 876,
        content: `
          <h1>Setting Up Your College Profile</h1>
          
          <p>An optimized college profile helps you attract the right student-athletes for your program. Follow these steps to create a compelling presence on HighLytr:</p>
          
          <h2>Initial Setup</h2>
          <ol>
            <li>Register using your official .edu email address</li>
            <li>Complete email verification</li>
            <li>Choose your department role (Head Coach, Assistant Coach, Recruiting Coordinator)</li>
            <li>Select your sport(s)</li>
            <li>Connect with your athletic department colleagues</li>
          </ol>
          
          <h2>Essential Profile Elements</h2>
          <ul>
            <li><strong>Institution overview:</strong> Brief history, location, size, and notable achievements</li>
            <li><strong>Athletic program details:</strong> Division, conference, recent team accomplishments</li>
            <li><strong>Facilities:</strong> Upload photos of your athletic facilities, training areas, and campus</li>
            <li><strong>Coaching staff:</strong> Add profiles for all coaches with photos and brief bios</li>
            <li><strong>Academic information:</strong> Available majors, academic support for athletes, average GPA</li>
            <li><strong>Roster needs:</strong> Specific positions and skills you're currently recruiting for</li>
          </ul>
          
          <h2>Showcasing Your Program</h2>
          <ul>
            <li><strong>Program video:</strong> Upload a 2-3 minute video highlighting your program culture and facilities</li>
            <li><strong>Player development:</strong> Highlight your approach to developing student-athletes</li>
            <li><strong>Alumni success:</strong> Feature notable alumni who have succeeded athletically and professionally</li>
            <li><strong>Team culture:</strong> Describe your team values, expectations, and environment</li>
            <li><strong>Competitive schedule:</strong> Highlight key opponents and tournaments</li>
          </ul>
          
          <h2>Scholarship and Financial Aid Information</h2>
          <ul>
            <li>Clarify whether your program offers athletic scholarships</li>
            <li>Provide general information about scholarship availability</li>
            <li>Include details about academic scholarships and financial aid options</li>
            <li>Explain walk-on opportunities if applicable</li>
          </ul>
          
          <h2>Maintaining Your Profile</h2>
          <ul>
            <li>Update your roster needs each recruiting cycle</li>
            <li>Post team news and achievements regularly</li>
            <li>Refresh photos and videos annually</li>
            <li>Keep coaching staff information current</li>
          </ul>
        `
      },
      { 
        id: 12, 
        title: 'Finding athletes by criteria', 
        description: 'Using filters to discover athletes who match your program needs',
        views: 765,
        content: `
          <h1>Finding Athletes by Criteria</h1>
          
          <p>HighLytr's powerful search tools help you find the perfect athletic talent for your program. Here's how to use our advanced filters effectively:</p>
          
          <h2>Accessing the Athlete Search</h2>
          <ol>
            <li>Log in to your college account</li>
            <li>Click "Athlete Search" in the main navigation</li>
            <li>Select your sport to begin</li>
          </ol>
          
          <h2>Basic Search Filters</h2>
          <ul>
            <li><strong>Position:</strong> Filter by primary and secondary positions</li>
            <li><strong>Graduation Year:</strong> Find athletes by their expected graduation date</li>
            <li><strong>Location:</strong> Search by country, region, or city</li>
            <li><strong>Height/Weight:</strong> Set minimum and maximum physical parameters</li>
            <li><strong>Available Now:</strong> Toggle to show only athletes currently available</li>
          </ul>
          
          <h2>Advanced Athletic Filters</h2>
          <ul>
            <li><strong>Performance Metrics:</strong> Sport-specific statistics (goals scored, assists, save percentage, etc.)</li>
            <li><strong>Competition Level:</strong> Filter by league division or tournament tier</li>
            <li><strong>Awards & Achievements:</strong> Search for athletes with specific accolades</li>
            <li><strong>National Team Experience:</strong> Find athletes who have represented their countries</li>
            <li><strong>Video Content:</strong> Filter by those with verified game footage</li>
          </ul>
          
          <h2>Academic Filters</h2>
          <ul>
            <li><strong>GPA Range:</strong> Set minimum GPA requirements</li>
            <li><strong>Test Scores:</strong> Filter by SAT, ACT, or TOEFL scores</li>
            <li><strong>Academic Interests:</strong> Find athletes interested in specific majors</li>
            <li><strong>Language Proficiency:</strong> Filter by English proficiency levels</li>
          </ul>
          
          <h2>Saving and Managing Searches</h2>
          <ul>
            <li><strong>Saved Searches:</strong> Save complex search criteria for future use</li>
            <li><strong>Search Alerts:</strong> Receive notifications when new athletes match your criteria</li>
            <li><strong>Recruitment Lists:</strong> Add promising athletes to categorized lists (Prospects, Top Targets, etc.)</li>
            <li><strong>Collaboration:</strong> Share search results with other coaches in your program</li>
          </ul>
          
          <h2>Premium Search Features</h2>
          <p>Upgrade to HighLytr Premium for enhanced search capabilities:</p>
          <ul>
            <li>Custom performance metric ranges</li>
            <li>Advanced video analysis filters</li>
            <li>Psychological profile compatibility</li>
            <li>Team fit scoring algorithm</li>
            <li>Competitor interest insights</li>
          </ul>
        `
      },
      { 
        id: 13, 
        title: 'Managing your coaching staff', 
        description: 'Adding and organizing your coaching team on the platform',
        views: 654,
        content: `
          <h1>Managing Your Coaching Staff</h1>
          
          <p>Effectively managing your coaching staff on HighLytr helps streamline recruitment processes and present a unified team to potential recruits. Here's how:</p>
          
          <h2>Adding Coaching Staff Members</h2>
          <ol>
            <li>Log in to your college administrator account</li>
            <li>Navigate to "Team Management" > "Coaching Staff"</li>
            <li>Click "Add New Coach"</li>
            <li>Enter the coach's .edu email address</li>
            <li>Select their role (Head Coach, Assistant Coach, etc.)</li>
            <li>Assign permissions based on their recruitment responsibilities</li>
            <li>Send invitation to join the platform</li>
          </ol>
          
          <h2>Coach Profile Information</h2>
          <p>Ensure each coach completes their profile with:</p>
          <ul>
            <li>Professional headshot (consistent style recommended for all staff)</li>
            <li>Coaching experience and tenure at your institution</li>
            <li>Notable achievements and specialties</li>
            <li>Brief coaching philosophy</li>
            <li>Contact information (if they wish to be contacted directly)</li>
          </ul>
          
          <h2>Setting Staff Permissions</h2>
          <p>Different access levels can be assigned:</p>
          <ul>
            <li><strong>Administrator:</strong> Full access to all recruitment tools and team settings</li>
            <li><strong>Recruiter:</strong> Can search, contact, and manage athlete profiles</li>
            <li><strong>Viewer:</strong> Can view athlete profiles and recruitment lists but cannot contact athletes</li>
            <li><strong>Limited:</strong> Access only to specific recruitment lists assigned by administrators</li>
          </ul>
          
          <h2>Collaborative Recruitment Features</h2>
          <ul>
            <li><strong>Shared Athlete Lists:</strong> Create lists visible to specific coaches</li>
            <li><strong>Notes & Evaluations:</strong> Add private staff notes to athlete profiles</li>
            <li><strong>Communication Log:</strong> Track all staff interactions with prospects</li>
            <li><strong>Task Assignment:</strong> Assign recruitment tasks to specific coaches</li>
            <li><strong>Calendar Integration:</strong> Coordinate recruiting events and athlete visits</li>
          </ul>
          
          <h2>Staff Activity Reports</h2>
          <p>Monitor recruitment efforts with:</p>
          <ul>
            <li>Weekly activity summaries by coach</li>
            <li>Athlete engagement statistics</li>
            <li>Response rates to outreach efforts</li>
            <li>Conversion metrics through the recruitment funnel</li>
          </ul>
          
          <h2>Staff Departures & Transitions</h2>
          <p>When a coach leaves your program:</p>
          <ol>
            <li>Navigate to "Team Management" > "Coaching Staff"</li>
            <li>Find the departing coach and click "Manage Access"</li>
            <li>Select "Remove Access" or "Transfer Responsibilities"</li>
            <li>Reassign their prospects and ongoing conversations to remaining staff</li>
            <li>Update your public-facing coaching roster</li>
          </ol>
        `
      },
      { 
        id: 14, 
        title: 'Creating recruitment campaigns', 
        description: 'Setting up targeted outreach to potential recruits',
        views: 543,
        content: `
          <h1>Creating Recruitment Campaigns</h1>
          
          <p>Effective recruitment campaigns help you connect with multiple suitable athletes efficiently. Here's how to create and manage targeted campaigns on HighLytr:</p>
          
          <h2>Planning Your Campaign</h2>
          <ul>
            <li>Define specific recruitment goals (positions, skills, academic profiles)</li>
            <li>Identify your target athlete demographic</li>
            <li>Establish campaign timeline aligned with recruitment periods</li>
            <li>Set measurable success metrics (response rate, profile views, connections)</li>
            <li>Prepare necessary resources (videos, program information, etc.)</li>
          </ul>
          
          <h2>Creating a New Campaign</h2>
          <ol>
            <li>Navigate to "Recruitment" > "Campaigns"</li>
            <li>Click "Create New Campaign"</li>
            <li>Name your campaign (e.g., "Fall 2025 Midfielders")</li>
            <li>Set campaign start and end dates</li>
            <li>Select target audience parameters</li>
            <li>Create or select message templates</li>
            <li>Assign staff members to manage the campaign</li>
          </ol>
          
          <h2>Building Your Target Audience</h2>
          <p>Define your audience by:</p>
          <ul>
            <li>Using saved search filters</li>
            <li>Importing athlete lists from previous campaigns</li>
            <li>Manually selecting athletes from your prospect lists</li>
            <li>Using HighLytr's AI-powered athlete recommendations</li>
            <li>Excluding athletes already engaged in other campaigns</li>
          </ul>
          
          <h2>Creating Effective Message Templates</h2>
          <p>Design templates that include:</p>
          <ul>
            <li>Personalization fields (athlete name, position, hometown)</li>
            <li>Compelling program information relevant to the target group</li>
            <li>Clear call-to-action (view profile, schedule call, etc.)</li>
            <li>Links to relevant video content or virtual tours</li>
            <li>Coach contact information</li>
          </ul>
          
          <h2>Campaign Execution and Follow-up</h2>
          <ul>
            <li>Schedule initial outreach messages</li>
            <li>Set up automated follow-ups for non-responders</li>
            <li>Create response templates for common athlete replies</li>
            <li>Schedule personalized follow-ups based on athlete engagement</li>
            <li>Move interested athletes to more focused recruitment paths</li>
          </ul>
          
          <h2>Analyzing Campaign Performance</h2>
          <p>Track key metrics through the campaign dashboard:</p>
          <ul>
            <li>Open rates and response rates</li>
            <li>Profile view conversion</li>
            <li>Connection request acceptance</li>
            <li>Message engagement over time</li>
            <li>Advancement through recruitment stages</li>
            <li>Staff performance comparisons</li>
          </ul>
        `
      },
      { 
        id: 15, 
        title: 'Tracking athlete interactions', 
        description: 'Monitoring and managing communications with prospects',
        views: 432,
        content: `
          <h1>Tracking Athlete Interactions</h1>
          
          <p>Maintaining organized records of all prospect communications is essential for effective recruitment. Here's how to manage athlete interactions in HighLytr:</p>
          
          <h2>The Athlete Interaction Dashboard</h2>
          <p>Access your interaction hub:</p>
          <ol>
            <li>Log in to your college account</li>
            <li>Navigate to "Recruitment" > "Athlete Interactions"</li>
            <li>View your recent communications and upcoming scheduled interactions</li>
          </ol>
          
          <h2>Recording Communication History</h2>
          <ul>
            <li><strong>Automatic Tracking:</strong> All platform messages, profile views, and connection requests are logged automatically</li>
            <li><strong>Manual Entries:</strong> Add notes about phone calls, video chats, campus visits, or tournament observations</li>
            <li><strong>Email Integration:</strong> Connect your recruiting email to sync external communications</li>
            <li><strong>File Uploads:</strong> Attach relevant documents to the athlete's communication history</li>
          </ul>
          
          <h2>Using the Recruitment Pipeline</h2>
          <p>Organize prospects by recruitment stage:</p>
          <ul>
            <li><strong>Initial Interest:</strong> First contact made</li>
            <li><strong>Engaged:</strong> Two-way communication established</li>
            <li><strong>Evaluating:</strong> Actively assessing fit for your program</li>
            <li><strong>High Interest:</strong> Strong mutual interest established</li>
            <li><strong>Offer Extended:</strong> Scholarship or roster spot offered</li>
            <li><strong>Committed:</strong> Athlete has committed to your program</li>
            <li><strong>Not Pursuing:</strong> No longer considering this prospect</li>
          </ul>
          
          <h2>Team Collaboration Tools</h2>
          <ul>
            <li><strong>Shared Notes:</strong> Add comments visible to your coaching staff</li>
            <li><strong>Assessment Forms:</strong> Complete standardized evaluations after interactions</li>
            <li><strong>Task Assignment:</strong> Delegate follow-up responsibilities to team members</li>
            <li><strong>Notification Alerts:</strong> Get notified of important prospect activities</li>
            <li><strong>@Mentions:</strong> Tag colleagues in notes to bring items to their attention</li>
          </ul>
          
          <h2>Scheduling Follow-ups</h2>
          <ul>
            <li>Set reminders for future contact points</li>
            <li>Schedule automated check-in messages</li>
            <li>Create calendar events for important deadlines</li>
            <li>Set up alerts for key dates (tournaments, signing periods)</li>
          </ul>
          
          <h2>Compliance Tracking</h2>
          <ul>
            <li>Monitor communication frequency to ensure compliance with NCAA/NAIA rules</li>
            <li>Track official/unofficial visits</li>
            <li>Document permissible contacts during quiet and dead periods</li>
            <li>Generate compliance reports for athletic department review</li>
          </ul>
          
          <h2>Analytical Insights</h2>
          <ul>
            <li>View response rates across different message types</li>
            <li>Identify the most effective communication channels</li>
            <li>Track conversion rates through your recruitment pipeline</li>
            <li>Compare engagement levels between different prospect segments</li>
          </ul>
        `
      }
    ],
    agencies: [
      { 
        id: 16, 
        title: 'Setting up an agency profile', 
        description: 'Best practices for agency representation on HighLytr',
        views: 765,
        content: `
          <h1>Setting Up Your Agency Profile</h1>
          
          <p>A professional, complete agency profile builds trust with athletes and colleges alike. Follow these guidelines to establish your agency effectively on HighLytr:</p>
          
          <h2>Agency Registration Process</h2>
          <ol>
            <li>Complete the standard registration form at highlytr.com/register</li>
            <li>Select "Agency" as your account type</li>
            <li>Provide your agency's official business information</li>
            <li>Submit verification documents (business license, proof of operation)</li>
            <li>Wait for verification approval (typically 1-2 business days)</li>
          </ol>
          
          <h2>Essential Profile Elements</h2>
          <ul>
            <li><strong>Agency logo:</strong> Upload a high-resolution version of your logo (500x500px minimum)</li>
            <li><strong>Cover photo:</strong> Feature your team or athletes you represent (1500x500px)</li>
            <li><strong>Agency description:</strong> Compelling overview of your services and approach</li>
            <li><strong>Establishment date:</strong> When your agency began operations</li>
            <li><strong>Geographic focus:</strong> Regions where you primarily operate</li>
            <li><strong>Sports coverage:</strong> All sports in which you represent athletes</li>
            <li><strong>Success metrics:</strong> Number of athletes placed, scholarship values secured, etc.</li>
          </ul>
          
          <h2>Team Member Profiles</h2>
          <p>Add profiles for key staff members:</p>
          <ul>
            <li>Professional headshots</li>
            <li>Titles and responsibilities</li>
            <li>Brief biographies highlighting relevant experience</li>
            <li>Educational and athletic backgrounds</li>
            <li>Languages spoken (important for international recruitment)</li>
          </ul>
          
          <h2>Showcasing Your Track Record</h2>
          <ul>
            <li><strong>Success stories:</strong> Feature profiles of athletes placed at colleges</li>
            <li><strong>Testimonials:</strong> Add quotes from satisfied athletes and families</li>
            <li><strong>College partnerships:</strong> Highlight established relationships with institutions</li>
            <li><strong>Placement statistics:</strong> Show percentage of athletes successfully recruited</li>
            <li><strong>Media coverage:</strong> Link articles or features about your agency</li>
          </ul>
          
          <h2>Service Offerings</h2>
          <p>Clearly outline what you provide to athletes:</p>
          <ul>
            <li>Profile development and optimization</li>
            <li>Highlight video creation/editing</li>
            <li>College matching and recommendations</li>
            <li>Direct coach outreach services</li>
            <li>Application assistance</li>
            <li>Academic guidance</li>
            <li>Scholarship negotiation</li>
          </ul>
          
          <h2>Agency Verification</h2>
          <p>Complete verification to earn the "Verified Agency" badge:</p>
          <ul>
            <li>Business registration documents</li>
            <li>Professional references</li>
            <li>Proof of successful placements</li>
            <li>Background checks for key personnel</li>
            <li>Signed code of ethics agreement</li>
          </ul>
        `
      },
      { 
        id: 17, 
        title: 'Adding athletes to your roster', 
        description: 'How to connect with and represent athletes on the platform',
        views: 654,
        content: `
          <h1>Adding Athletes to Your Roster</h1>
          
          <p>Managing your athlete roster efficiently is key to successful agency operations on HighLytr. Here's how to build and maintain your athlete roster:</p>
          
          <h2>Methods to Add Athletes</h2>
          <p>There are three ways to add athletes to your roster:</p>
          <ol>
            <li><strong>Invite New Athletes:</strong> Send invitations to athletes not yet on the platform</li>
            <li><strong>Connect with Existing Athletes:</strong> Send connection requests to athletes already using HighLytr</li>
            <li><strong>Create Managed Profiles:</strong> Build profiles for your athletes that you'll manage for them</li>
          </ol>
          
          <h2>Inviting New Athletes</h2>
          <ol>
            <li>Navigate to "Athlete Roster" > "Add Athletes"</li>
            <li>Select "Invite Athletes"</li>
            <li>Enter athlete email addresses (individually or bulk upload)</li>
            <li>Customize the invitation message</li>
            <li>Specify what information you'll need from them</li>
            <li>Send invitations and track acceptance status</li>
          </ol>
          
          <h2>Connecting with Existing Athletes</h2>
          <ol>
            <li>Use the athlete search function to find prospects</li>
            <li>Visit the athlete's profile</li>
            <li>Click "Request Representation"</li>
            <li>Include a personalized message explaining your agency's value</li>
            <li>Wait for the athlete to accept your request</li>
          </ol>
          
          <h2>Creating Managed Profiles</h2>
          <ol>
            <li>Go to "Athlete Roster" > "Create Managed Profile"</li>
            <li>Enter the athlete's basic information</li>
            <li>Upload photos, videos, and other materials</li>
            <li>Add athletic and academic credentials</li>
            <li>Set profile visibility preferences</li>
            <li>Obtain electronic consent from the athlete or parent/guardian</li>
          </ol>
          
          <h2>Required Documentation</h2>
          <p>For proper athlete representation, collect and upload:</p>
          <ul>
            <li>Signed representation agreement</li>
            <li>Parent/guardian consent (for minors)</li>
            <li>Academic transcripts and test scores</li>
            <li>Athletic achievement verification</li>
            <li>Photo/video release forms</li>
          </ul>
          
          <h2>Organizing Your Athlete Roster</h2>
          <ul>
            <li><strong>Custom Categories:</strong> Create groups based on sport, age, priority, etc.</li>
            <li><strong>Status Tracking:</strong> Monitor each athlete's recruitment progress</li>
            <li><strong>Advanced Filters:</strong> Sort athletes by various criteria</li>
            <li><strong>Activity Logs:</strong> Track platform interactions for each athlete</li>
            <li><strong>Notes & Reminders:</strong> Add private notes and set follow-up reminders</li>
          </ul>
          
          <h2>Best Practices for Athlete Management</h2>
          <ul>
            <li>Regularly review and update athlete profiles with new achievements</li>
            <li>Upload new highlight videos each season</li>
            <li>Schedule periodic check-ins with each athlete</li>
            <li>Create realistic recruitment timelines for each athlete</li>
            <li>Be transparent about college interest and communication</li>
          </ul>
        `
      },
      { 
        id: 18, 
        title: 'Creating marketing packages', 
        description: 'Developing effective promotional materials for your athletes',
        views: 543,
        content: `
          <h1>Creating Marketing Packages for Athletes</h1>
          
          <p>Professional marketing materials can significantly increase an athlete's visibility and appeal to college recruiters. Here's how to create compelling packages for your athletes:</p>
          
          <h2>Elements of an Effective Marketing Package</h2>
          <p>A comprehensive package should include:</p>
          <ul>
            <li><strong>Athletic Profile:</strong> Complete HighLytr profile with all relevant metrics and achievements</li>
            <li><strong>Highlight Video:</strong> Professional-quality video showcasing the athlete's skills</li>
            <li><strong>Athletic Resume/CV:</strong> One-page summary of key achievements and statistics</li>
            <li><strong>Academic Credentials:</strong> Transcript summary, test scores, and academic achievements</li>
            <li><strong>Personal Statement:</strong> Well-crafted statement of athletic goals and character</li>
            <li><strong>Coach References:</strong> Testimonials or contact information for references</li>
          </ul>
          
          <h2>Creating Professional Highlight Videos</h2>
          <p>Tips for effective video production:</p>
          <ul>
            <li>Keep videos between 3-5 minutes for optimal coach engagement</li>
            <li>Start with a brief introduction (name, position, graduation year, key stats)</li>
            <li>Place the best highlights in the first 30 seconds</li>
            <li>Include a variety of game situations showing versatility</li>
            <li>Use subtle graphics to identify the athlete in team plays</li>
            <li>Include slow-motion replays of technical skills when relevant</li>
            <li>End with contact information and a call to action</li>
          </ul>
          
          <h2>Digital Asset Creation</h2>
          <ul>
            <li><strong>Professional Photos:</strong> Action shots and portrait-style headshots</li>
            <li><strong>Digital Athletic Card:</strong> Shareable graphic with key metrics and photo</li>
            <li><strong>Infographics:</strong> Visual representation of performance statistics</li>
            <li><strong>Social Media Kit:</strong> Pre-sized graphics for various platforms</li>
            <li><strong>Email Signature:</strong> Professional signature with link to HighLytr profile</li>
          </ul>
          
          <h2>Using the HighLytr Marketing Tools</h2>
          <ol>
            <li>Log in to your agency account</li>
            <li>Navigate to "Athlete Roster" > select an athlete</li>
            <li>Click "Marketing Tools"</li>
            <li>Select "Create New Package"</li>
            <li>Choose from available templates or start from scratch</li>
            <li>Customize content, colors, and branding</li>
            <li>Preview across different devices</li>
            <li>Generate shareable links and export options</li>
          </ol>
          
          <h2>Distribution Strategies</h2>
          <ul>
            <li><strong>Direct Outreach:</strong> Personalized emails to targeted coaches</li>
            <li><strong>College Database:</strong> Filter and contact relevant programs through HighLytr</li>
            <li><strong>Social Media Campaigns:</strong> Targeted posts on platforms frequented by recruiters</li>
            <li><strong>Showcase Events:</strong> Share digital packages before and after events</li>
            <li><strong>Video Distribution:</strong> Upload to YouTube with proper tags and optimization</li>
          </ul>
          
          <h2>Measuring Marketing Effectiveness</h2>
          <p>Track these metrics in your HighLytr dashboard:</p>
          <ul>
            <li>Profile view analytics</li>
            <li>Video view counts and engagement duration</li>
            <li>College interest indicators</li>
            <li>Message response rates</li>
            <li>Connection request acceptance</li>
          </ul>
        `
      },
      { 
        id: 19, 
        title: 'Promoting athletes to colleges', 
        description: 'Strategies for highlighting your athletes to college recruiters',
        views: 432,
        content: `
          <h1>Promoting Athletes to Colleges</h1>
          
          <p>Strategic promotion of your athletes to college programs is at the core of successful agency work. Here's how to maximize visibility and opportunities for your clients:</p>
          
          <h2>Understanding the College Recruitment Landscape</h2>
          <ul>
            <li>Research college programs that match your athletes' abilities and academic profiles</li>
            <li>Understand division differences (NCAA I, II, III, NAIA, NJCAA)</li>
            <li>Learn each program's recruitment timeline and needs</li>
            <li>Identify coaching staff responsible for international recruitment</li>
            <li>Follow recruiting calendars and contact period regulations</li>
          </ul>
          
          <h2>Targeted College Outreach</h2>
          <ol>
            <li>Create a customized list of potential college matches for each athlete</li>
            <li>Develop personalized introduction emails for each program</li>
            <li>Include specific reasons why your athlete would fit their program</li>
            <li>Reference past games or team performance to show genuine interest</li>
            <li>Share your athlete's HighLytr profile link and highlight video</li>
          </ol>
          
          <h2>Using HighLytr's College Connection Tools</h2>
          <ul>
            <li><strong>College Matching:</strong> Use the AI-powered matching feature to find compatible programs</li>
            <li><strong>Bulk Communications:</strong> Send customized messages to multiple programs</li>
            <li><strong>Interest Tracking:</strong> Monitor which programs view your athletes' profiles</li>
            <li><strong>Coach Direct Messages:</strong> Communicate with verified college coaches</li>
            <li><strong>Showcase Events:</strong> Promote athletes attending specific tournaments or events</li>
          </ul>
          
          <h2>Creating College-Specific Presentations</h2>
          <ul>
            <li>Customize highlight videos to emphasize skills valued by specific programs</li>
            <li>Create side-by-side comparisons with current roster players</li>
            <li>Highlight cultural and academic fit factors</li>
            <li>Include testimonials from coaches who have worked with the athlete</li>
          </ul>
          
          <h2>Nurturing College Relationships</h2>
          <ul>
            <li>Maintain a database of coach contacts and interactions</li>
            <li>Follow up appropriately without overwhelming coaches</li>
            <li>Provide regular updates on athlete development and achievements</li>
            <li>Build reputation for representing quality, reliable athletes</li>
            <li>Attend collegiate showcases and recruitment events</li>
          </ul>
          
          <h2>Providing Value to College Coaches</h2>
          <ul>
            <li>Offer comprehensive, accurate information about your athletes</li>
            <li>Be transparent about strengths and areas for development</li>
            <li>Facilitate easy communication between coaches and athletes</li>
            <li>Help with logistics for international recruitment (visas, travel, etc.)</li>
            <li>Build a reputation as a reliable source for suitable recruits</li>
          </ul>
          
          <h2>Measuring Promotional Success</h2>
          <ul>
            <li>Track college profile views and engagement</li>
            <li>Monitor response rates to outreach efforts</li>
            <li>Record expressions of interest from programs</li>
            <li>Document advancement through recruitment stages</li>
            <li>Analyze conversion rates from initial contact to offers</li>
          </ul>
        `
      },
      { 
        id: 20, 
        title: 'Managing athlete relationships', 
        description: 'Building and maintaining strong partnerships with your athletes',
        views: 321,
        content: `
          <h1>Managing Athlete Relationships</h1>
          
          <p>Strong, trust-based relationships with your athletes are the foundation of successful agency work. Here's how to build and maintain these crucial partnerships:</p>
          
          <h2>Establishing Clear Expectations</h2>
          <ul>
            <li>Create comprehensive representation agreements outlining services provided</li>
            <li>Set realistic expectations about recruitment possibilities and timelines</li>
            <li>Clarify roles and responsibilities for both agency and athlete</li>
            <li>Establish communication protocols and response timeframes</li>
            <li>Be transparent about any fees or success-based compensation</li>
          </ul>
          
          <h2>Regular Communication Strategies</h2>
          <ul>
            <li>Schedule consistent check-in calls or video meetings</li>
            <li>Provide weekly or monthly progress reports on recruitment activities</li>
            <li>Share relevant college information and recruitment insights</li>
            <li>Offer constructive feedback on athletic development and areas for improvement</li>
            <li>Use the HighLytr messaging system to keep all communications in one place</li>
          </ul>
          
          <h2>Athlete Development Support</h2>
          <ul>
            <li>Provide guidance on skills to highlight or develop for college recruitment</li>
            <li>Offer academic counseling or resources to maintain eligibility</li>
            <li>Connect athletes with specialized training opportunities</li>
            <li>Provide mental preparation resources for the collegiate level</li>
            <li>Prepare athletes for coach communications and interviews</li>
          </ul>
          
          <h2>Using HighLytr's Relationship Tools</h2>
          <ul>
            <li><strong>Progress Dashboard:</strong> Share recruitment funnel visibility with athletes</li>
            <li><strong>Document Sharing:</strong> Securely exchange important documents</li>
            <li><strong>Task Management:</strong> Assign and track action items for athletes</li>
            <li><strong>Profile Analytics:</strong> Show athletes their profile performance and views</li>
            <li><strong>College Matches:</strong> Collaboratively review and refine college targets</li>
          </ul>
          
          <h2>Family Inclusion</h2>
          <ul>
            <li>Establish appropriate communication channels with parents/guardians</li>
            <li>Provide educational resources about the college recruitment process</li>
            <li>Set clear boundaries regarding involvement in decisions</li>
            <li>Host periodic family meetings to review progress and answer questions</li>
            <li>Prepare families for their role in campus visits and decision-making</li>
          </ul>
          
          <h2>Building Trust Over Time</h2>
          <ul>
            <li>Follow through consistently on commitments and promises</li>
            <li>Be honest about recruitment challenges and opportunities</li>
            <li>Celebrate achievements and milestones together</li>
            <li>Maintain confidentiality about sensitive information</li>
            <li>Be accessible during critical recruitment periods</li>
          </ul>
          
          <h2>Managing Difficult Conversations</h2>
          <ul>
            <li>Address unrealistic expectations with empathy and facts</li>
            <li>Provide honest feedback when athletic performance affects recruitment</li>
            <li>Navigate disagreements about target schools or scholarship expectations</li>
            <li>Prepare contingency plans if primary recruitment goals aren't met</li>
            <li>Know when to recommend alternative pathways if needed</li>
          </ul>
        `
      }
    ],
    technical: [
      { 
        id: 21, 
        title: 'Troubleshooting login issues', 
        description: 'Solutions for common account access problems',
        views: 987,
        content: `
          <h1>Troubleshooting Login Issues</h1>
          
          <p>Having trouble accessing your HighLytr account? Here are solutions for common login problems:</p>
          
          <h2>Forgotten Password</h2>
          <ol>
            <li>Go to the HighLytr login page</li>
            <li>Click "Forgot Password?" below the login form</li>
            <li>Enter the email address associated with your account</li>
            <li>Check your email (including spam/junk folders) for a reset link</li>
            <li>Click the link and follow instructions to create a new password</li>
            <li>Use your new password to log in</li>
          </ol>
          
          <h2>Email Verification Problems</h2>
          <ul>
            <li><strong>Didn't receive verification email:</strong> Check spam folders, then request a new verification email from the login page by clicking "Resend Verification"</li>
            <li><strong>Expired verification link:</strong> Request a new verification email by attempting to log in</li>
            <li><strong>Wrong email address:</strong> Contact support to update your email</li>
          </ul>
          
          <h2>Account Locked</h2>
          <p>Your account may be temporarily locked after multiple failed login attempts.</p>
          <ol>
            <li>Wait 30 minutes before trying again</li>
            <li>Use the "Forgot Password?" option to reset your password</li>
            <li>If still locked after password reset, contact support</li>
          </ol>
          
          <h2>Browser-Related Issues</h2>
          <ul>
            <li>Clear your browser's cache and cookies</li>
            <li>Try using an incognito/private browsing window</li>
            <li>Ensure your browser is updated to the latest version</li>
            <li>Disable browser extensions that might interfere with login</li>
            <li>Try a different browser (Chrome, Firefox, Safari, or Edge)</li>
          </ul>
          
          <h2>Two-Factor Authentication (2FA) Problems</h2>
          <ul>
            <li><strong>Lost access to authentication device:</strong> Use your backup codes (provided when you enabled 2FA)</li>
            <li><strong>Backup codes unavailable:</strong> Contact support with proof of identity</li>
            <li><strong>Authentication app issues:</strong> Ensure your device's time/date settings are correct</li>
          </ul>
          
          <h2>Connection Problems</h2>
          <ul>
            <li>Check your internet connection</li>
            <li>Try connecting via a different network</li>
            <li>Disable VPN services temporarily (some might be blocked)</li>
            <li>Check if HighLytr is experiencing service issues on our status page</li>
          </ul>
          
          <h2>Still Having Trouble?</h2>
          <p>If you've tried these solutions and still can't log in:</p>
          <ol>
            <li>Email support@highlytr.com with details about your issue</li>
            <li>Include your account email, device type, browser, and screenshots of any error messages</li>
            <li>Our support team will respond within 24 business hours</li>
          </ol>
        `
      },
      { 
        id: 22, 
        title: 'Video upload problems', 
        description: 'Fixing issues with uploading highlight reels and videos',
        views: 876,
        content: `
          <h1>Video Upload Problems</h1>
          
          <p>Experiencing issues uploading your athletic highlights? Here's how to troubleshoot common video upload problems:</p>
          
          <h2>Video Requirements and Limitations</h2>
          <p>First, ensure your video meets HighLytr's requirements:</p>
          <ul>
            <li><strong>Supported formats:</strong> MP4, MOV, AVI, WMV</li>
            <li><strong>Maximum file size:</strong> 500MB per video</li>
            <li><strong>Maximum length:</strong> 10 minutes</li>
            <li><strong>Resolution:</strong> Minimum 720p (1080p recommended)</li>
            <li><strong>Aspect ratio:</strong> 16:9 preferred</li>
          </ul>
          
          <h2>Common Upload Errors and Solutions</h2>
          
          <h3>Error: "Upload Failed" or Upload Freezes</h3>
          <ul>
            <li>Check your internet connection stability</li>
            <li>Try a stronger WiFi connection or wired ethernet</li>
            <li>Restart your browser and clear cache</li>
            <li>Try uploading during off-peak hours</li>
            <li>Split large videos into smaller segments</li>
          </ul>
          
          <h3>Error: "File Type Not Supported"</h3>
          <ul>
            <li>Convert your video to MP4 format (most universally accepted)</li>
            <li>Use a free conversion tool like HandBrake or online converters</li>
            <li>Check if your file has an unusual codec despite correct extension</li>
          </ul>
          
          <h3>Error: "File Exceeds Maximum Size"</h3>
          <ul>
            <li>Compress your video using an online tool or desktop software</li>
            <li>Reduce the resolution if it's higher than 1080p</li>
            <li>Trim unnecessary footage to shorten the video</li>
            <li>Split into multiple highlight videos by play type or game</li>
          </ul>
          
          <h2>Video Processing Issues</h2>
          <p>Sometimes videos upload but don't process correctly:</p>
          <ul>
            <li><strong>Stuck on "Processing":</strong> Wait 15-30 minutes, as processing time depends on length and quality</li>
            <li><strong>Low quality after upload:</strong> The system may still be generating higher quality versions</li>
            <li><strong>Playback errors:</strong> Try re-uploading with a different format or compression</li>
          </ul>
          
          <h2>Alternative Upload Methods</h2>
          <ul>
            <li><strong>YouTube Link:</strong> Upload to YouTube and link your video instead of direct upload</li>
            <li><strong>Mobile App:</strong> Try uploading through the HighLytr mobile app instead of browser</li>
            <li><strong>Batch Uploader:</strong> For multiple videos, use our bulk upload tool for better reliability</li>
          </ul>
          
          <h2>Video Best Practices</h2>
          <ul>
            <li>Edit your videos before uploading for optimal file size and content</li>
            <li>Use descriptive titles that include your name, position, and year</li>
            <li>Add detailed descriptions with timestamps for key moments</li>
            <li>Select a compelling thumbnail that shows you in action</li>
          </ul>
          
          <h2>Still Having Issues?</h2>
          <p>If you've tried these solutions and are still experiencing problems:</p>
          <ol>
            <li>Record your specific error message and when it occurs</li>
            <li>Note your device, browser, and internet connection type</li>
            <li>Contact support@highlytr.com with these details</li>
            <li>Our technical team can provide personalized assistance</li>
          </ol>
        `
      },
      { 
        id: 23, 
        title: 'Browser compatibility', 
        description: 'Supported browsers and troubleshooting display issues',
        views: 765,
        content: `
          <h1>Browser Compatibility Guide</h1>
          
          <p>HighLytr is optimized for modern web browsers. Here's everything you need to know about browser compatibility and how to resolve common display issues:</p>
          
          <h2>Supported Browsers</h2>
          <p>HighLytr works best on these browsers (latest two major versions):</p>
          <ul>
            <li><strong>Google Chrome:</strong> Full support, recommended for best experience</li>
            <li><strong>Mozilla Firefox:</strong> Full support</li>
            <li><strong>Safari:</strong> Full support on version 14+ (macOS/iOS)</li>
            <li><strong>Microsoft Edge:</strong> Full support (Chromium version)</li>
            <li><strong>Opera:</strong> Full support</li>
          </ul>
          
          <p>Limited support on:</p>
          <ul>
            <li><strong>Internet Explorer:</strong> Not supported, please use Edge or another modern browser</li>
            <li><strong>Older mobile browsers:</strong> Basic functionality only</li>
          </ul>
          
          <h2>Common Display Issues and Solutions</h2>
          
          <h3>Page Layout Problems</h3>
          <ul>
            <li><strong>Elements overlapping:</strong> Try zooming out (Ctrl/Cmd + -) or resizing your browser window</li>
            <li><strong>Text too small/large:</strong> Adjust browser zoom settings (Ctrl/Cmd + +/-)</li>
            <li><strong>Misaligned components:</strong> Clear browser cache and reload the page</li>
          </ul>
          
          <h3>Images or Videos Not Displaying</h3>
          <ul>
            <li>Check your internet connection</li>
            <li>Ensure images aren't being blocked by browser settings or extensions</li>
            <li>Try hard refresh (Ctrl/Cmd + Shift + R)</li>
            <li>Verify that JavaScript is enabled in your browser settings</li>
          </ul>
          
          <h3>Interactive Elements Not Working</h3>
          <ul>
            <li>Ensure JavaScript is enabled</li>
            <li>Disable content blockers or ad blockers temporarily</li>
            <li>Check for browser extension conflicts</li>
            <li>Update your browser to the latest version</li>
          </ul>
          
          <h2>Optimizing Your Browser Experience</h2>
          <ul>
            <li><strong>Keep updated:</strong> Always use the latest version of your browser</li>
            <li><strong>Clear cache regularly:</strong> Clear browsing data every few weeks</li>
            <li><strong>Screen resolution:</strong> Use minimum 1280x720 resolution</li>
            <li><strong>Cookies:</strong> Enable cookies for full functionality</li>
            <li><strong>Extensions:</strong> Be aware that some extensions may interfere with site functionality</li>
          </ul>
          
          <h2>Mobile Browser Considerations</h2>
          <ul>
            <li>HighLytr is fully responsive for mobile browsers</li>
            <li>For best mobile experience, use our dedicated mobile app instead</li>
            <li>Some advanced features may be limited on mobile browsers</li>
            <li>Rotate to landscape orientation for better viewing of videos and profiles</li>
          </ul>
          
          <h2>Browser-Specific Tips</h2>
          <ul>
            <li><strong>Chrome:</strong> Ensure hardware acceleration is enabled for smoother video playback</li>
            <li><strong>Firefox:</strong> Check that Enhanced Tracking Protection isn't blocking site functionality</li>
            <li><strong>Safari:</strong> Verify that "Prevent Cross-Site Tracking" isn't causing login issues</li>
            <li><strong>Edge:</strong> Try disabling "Efficiency mode" if experiencing performance issues</li>
          </ul>
        `
      },
      { 
        id: 24, 
        title: 'Mobile app installation', 
        description: 'Guide for downloading and setting up the HighLytr mobile app',
        views: 654,
        content: `
          <h1>Mobile App Installation Guide</h1>
          
          <p>The HighLytr mobile app gives you full access to your recruitment journey on the go. Follow these steps to download, install, and set up the app on your device:</p>
          
          <h2>Supported Devices</h2>
          <ul>
            <li><strong>iOS:</strong> iPhone and iPad running iOS 13.0 or later</li>
            <li><strong>Android:</strong> Devices running Android 8.0 (Oreo) or later</li>
            <li><strong>Storage required:</strong> Approximately 100MB free space</li>
          </ul>
          
          <h2>Installing on iOS Devices</h2>
          <ol>
            <li>Open the App Store on your iPhone or iPad</li>
            <li>Tap the Search icon (magnifying glass) at the bottom of the screen</li>
            <li>Type "HighLytr" in the search bar</li>
            <li>Look for the HighLytr app with our logo</li>
            <li>Tap "Get" or the cloud icon (if previously downloaded)</li>
            <li>Authenticate with Face ID, Touch ID, or your Apple ID password</li>
            <li>Wait for the download and installation to complete</li>
            <li>Tap "Open" to launch the app</li>
          </ol>
          
          <h2>Installing on Android Devices</h2>
          <ol>
            <li>Open the Google Play Store on your Android device</li>
            <li>Tap the Search bar at the top of the screen</li>
            <li>Type "HighLytr" in the search bar</li>
            <li>Locate the HighLytr app with our logo in the search results</li>
            <li>Tap "Install"</li>
            <li>Review and accept any permission requests</li>
            <li>Wait for the download and installation to complete</li>
            <li>Tap "Open" to launch the app</li>
          </ol>
          
          <h2>Setting Up Your Account</h2>
          <ul>
            <li><strong>New users:</strong> Tap "Create Account" and follow the registration process</li>
            <li><strong>Existing users:</strong> Enter your email and password to log in</li>
            <li><strong>Social login:</strong> Use Apple, Google, or Facebook accounts for faster access</li>
          </ul>
          
          <h2>App Permissions</h2>
          <p>The app may request these permissions for full functionality:</p>
          <ul>
            <li><strong>Camera access:</strong> For profile photos and uploading videos</li>
            <li><strong>Photo library access:</strong> To upload existing photos and videos</li>
            <li><strong>Notifications:</strong> For alerts about messages and profile activity</li>
            <li><strong>Location (optional):</strong> For location-based features</li>
          </ul>
          
          <h2>Troubleshooting Installation Issues</h2>
          
          <h3>App Won't Download</h3>
          <ul>
            <li>Check your internet connection</li>
            <li>Ensure you have sufficient storage space</li>
            <li>Verify that your device meets the minimum requirements</li>
            <li>Restart your device and try again</li>
          </ul>
          
          <h3>App Crashes on Launch</h3>
          <ul>
            <li>Force close the app and try again</li>
            <li>Restart your device</li>
            <li>Uninstall and reinstall the app</li>
            <li>Ensure your operating system is up to date</li>
          </ul>
          
          <h2>Data Usage and Offline Access</h2>
          <ul>
            <li>The app requires an internet connection for most features</li>
            <li>Video uploads consume significant data; use WiFi when possible</li>
            <li>Some content can be cached for offline viewing in Settings</li>
            <li>Set "Data Saver" mode in app settings to reduce mobile data usage</li>
          </ul>
          
          <h2>App Updates</h2>
          <p>We regularly improve the app with new features and performance enhancements:</p>
          <ul>
            <li>Enable automatic updates in your device's app store settings</li>
            <li>Check for updates manually in the app store</li>
            <li>Read the "What's New" section to learn about new features</li>
          </ul>
        `
      },
      { 
        id: 25, 
        title: 'Data synchronization issues', 
        description: 'Resolving problems with profile data not updating properly',
        views: 543,
        content: `
          <h1>Data Synchronization Issues</h1>
          
          <p>If you're experiencing problems with your profile data not updating properly across devices or platforms, here's how to resolve common synchronization issues:</p>
          
          <h2>Understanding Data Synchronization</h2>
          <p>HighLytr synchronizes your data across:</p>
          <ul>
            <li>Web browser access (multiple devices)</li>
            <li>iOS and Android mobile apps</li>
            <li>Connected third-party applications</li>
          </ul>
          
          <h2>Common Synchronization Problems</h2>
          
          <h3>Profile Updates Not Appearing</h3>
          <ul>
            <li><strong>Issue:</strong> Changes made on one device don't appear on others</li>
            <li><strong>Solution:</strong>
              <ol>
                <li>Force refresh on the lagging device (Ctrl/Cmd + Shift + R)</li>
                <li>Log out and log back in on all devices</li>
                <li>Check internet connectivity on both devices</li>
                <li>Allow up to 15 minutes for non-critical updates to propagate</li>
              </ol>
            </li>
          </ul>
          
          <h3>Missing or Incomplete Data</h3>
          <ul>
            <li><strong>Issue:</strong> Some profile elements are missing across platforms</li>
            <li><strong>Solution:</strong>
              <ol>
                <li>Verify that all profile sections are complete</li>
                <li>Re-upload any missing media files</li>
                <li>Check for validation errors in red text</li>
                <li>Ensure you've saved changes (look for confirmation messages)</li>
              </ol>
            </li>
          </ul>
          
          <h3>Conflicting Data Versions</h3>
          <ul>
            <li><strong>Issue:</strong> Different information appears on different devices</li>
            <li><strong>Solution:</strong>
              <ol>
                <li>Identify which version is correct/most recent</li>
                <li>Update the outdated device with the correct information</li>
                <li>Save changes and allow time to synchronize</li>
                <li>Avoid editing the same profile section simultaneously on multiple devices</li>
              </ol>
            </li>
          </ul>
          
          <h2>Mobile-Specific Synchronization Issues</h2>
          <ul>
            <li><strong>Background App Refresh:</strong> Ensure this is enabled in your device settings</li>
            <li><strong>App Version:</strong> Update to the latest version of the HighLytr app</li>
            <li><strong>Cache Clearing:</strong> In app settings, select "Clear Cache" option</li>
            <li><strong>Offline Mode:</strong> Check if you inadvertently enabled offline mode</li>
          </ul>
          
          <h2>Web Browser Synchronization Tips</h2>
          <ul>
            <li>Clear browser cache and cookies</li>
            <li>Try an incognito/private browsing window</li>
            <li>Disable browser extensions that might interfere with data loading</li>
            <li>Ensure your browser is up to date</li>
          </ul>
          
          <h2>Manual Data Resynchronization</h2>
          <ol>
            <li>Log in to the HighLytr website</li>
            <li>Go to "Account Settings" > "Advanced"</li>
            <li>Look for "Data Synchronization" section</li>
            <li>Click "Force Resync" button</li>
            <li>Wait for the sync process to complete (may take several minutes)</li>
            <li>Log out and back in on all devices</li>
          </ol>
          
          <h2>When to Contact Support</h2>
          <p>If you've tried the above solutions and still experience synchronization issues:</p>
          <ul>
            <li>Data missing for more than 24 hours</li>
            <li>Critical information (videos, academic records) not syncing</li>
            <li>Persistent error messages during synchronization attempts</li>
            <li>Profile appears completely different across platforms</li>
          </ul>
          
          <p>Contact support@highlytr.com with screenshots of the different versions you're seeing across devices.</p>
        `
      }
    ]
  };

  const [activeArticle, setActiveArticle] = useState<null | {
    title: string;
    content: string;
  }>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would go here
    console.log("Searching for:", searchQuery);
  };

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions and learn how to get the most out of HighLytr
          </p>
          
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input 
              placeholder="Search for help articles..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="absolute right-0 top-0 rounded-l-none">
              Search
            </Button>
          </form>
        </div>
        
        {activeArticle ? (
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setActiveArticle(null)}
              className="mb-4"
            >
              ← Back to Articles
            </Button>
            <div className="bg-white p-8 rounded-lg shadow">
              <div dangerouslySetInnerHTML={{ __html: activeArticle.content }} />
            </div>
          </div>
        ) : (
          <Tabs defaultValue="account" className="mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  {category.icon}
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {helpArticles[category.id as keyof typeof helpArticles].map(article => (
                    <Card key={article.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <button 
                          onClick={() => setActiveArticle({title: article.title, content: article.content})}
                          className="block w-full text-left"
                        >
                          <h3 className="font-semibold text-lg mb-2 text-highlyt-blue">{article.title}</h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">{article.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">{article.views} views</span>
                            <span className="text-sm text-highlyt-blue flex items-center gap-1">
                              Read more <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
        
        <div className="bg-highlyt-gray rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is always ready to assist you with any questions or issues.
          </p>
          <Button variant="default" asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
        
        {/* Debugging component for logo issues */}
        <div className="mt-16">
          <LogoDebug />
        </div>
      </div>
    </Layout>
  );
};

export default Help;
