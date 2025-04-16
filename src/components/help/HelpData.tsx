
import React from 'react';
import { BookOpen, CheckCircle, FileText, ShieldCheck, Zap } from 'lucide-react';

interface HelpArticle {
  id: number;
  title: string;
  description: string;
  views: number;
  content: string;
}

interface CategoryData {
  id: string;
  title: string;
  icon: React.ReactNode;
}

// Categories of help articles
export const categories: CategoryData[] = [
  { id: 'account', title: 'Account & Profile', icon: <ShieldCheck className="h-5 w-5" /> },
  { id: 'athletes', title: 'For Athletes', icon: <Zap className="h-5 w-5" /> },
  { id: 'colleges', title: 'For Colleges', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'agencies', title: 'For Agencies', icon: <FileText className="h-5 w-5" /> },
  { id: 'technical', title: 'Technical Support', icon: <CheckCircle className="h-5 w-5" /> }
];

// More detailed help articles
export const helpArticles: Record<string, HelpArticle[]> = {
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
        </ul>
      `
    }
  ],
  agencies: [
    { 
      id: 16, 
      title: 'Creating an agency profile', 
      description: 'Set up a professional profile that attracts athletes and colleges',
      views: 765,
      content: `
        <h1>Creating Your Agency Profile</h1>
        
        <p>A strong agency profile establishes your credibility and helps you connect with both athletes and colleges. Here's how to create an effective presence on HighLytr:</p>
        
        <h2>Getting Started</h2>
        <ol>
          <li>Register with your business email address</li>
          <li>Verify your agency through our verification process</li>
          <li>Upload your agency logo (recommended size: 400x400px)</li>
          <li>Add your business address and contact information</li>
        </ol>
        
        <h2>Key Profile Elements</h2>
        <ul>
          <li><strong>Agency Overview:</strong> Write a concise yet comprehensive description of your services</li>
          <li><strong>Specializations:</strong> Indicate which sports, regions, and levels you specialize in</li>
          <li><strong>Team Members:</strong> Add profiles for all representatives with their credentials</li>
          <li><strong>Success Stories:</strong> Highlight notable athlete placements and success stories</li>
          <li><strong>Credentials:</strong> List any relevant certifications, affiliations, or recognitions</li>
        </ul>
        
        <h2>Showcasing Your Services</h2>
        <p>Be clear about what you offer:</p>
        <ul>
          <li>Athletic development programs</li>
          <li>College recruitment assistance</li>
          <li>Academic guidance</li>
          <li>Professional career management</li>
          <li>Marketing and branding services</li>
          <li>NIL management and opportunities</li>
        </ul>
        
        <h2>Media Content</h2>
        <ul>
          <li>Add photos of your facilities (if applicable)</li>
          <li>Include video testimonials from satisfied clients</li>
          <li>Share success metrics and placement statistics</li>
          <li>Create a virtual tour of your agency</li>
        </ul>
        
        <h2>Compliance Information</h2>
        <p>Establish trust through transparency:</p>
        <ul>
          <li>Clearly state your fee structure</li>
          <li>List all relevant certifications and registrations</li>
          <li>Explain your ethical standards and policies</li>
          <li>Clarify your relationship with athletic governing bodies</li>
        </ul>
      `
    },
    { 
      id: 17, 
      title: 'Managing your athlete roster', 
      description: 'Tools for effectively representing multiple athletes',
      views: 621,
      content: `
        <h1>Managing Your Athlete Roster</h1>
        
        <p>Efficiently managing your athlete clients on HighLytr helps streamline your representation services. Here's how to make the most of our agency tools:</p>
        
        <h2>Adding Athletes to Your Roster</h2>
        <ol>
          <li>Navigate to "My Athletes" in your agency dashboard</li>
          <li>Click "Add Athlete" to send an invitation</li>
          <li>Enter the athlete's email or search for their existing profile</li>
          <li>Specify your relationship (primary agent, recruiting specialist, etc.)</li>
          <li>The athlete will receive a notification to accept your representation</li>
        </ol>
        
        <h2>Customizing Athlete Visibility</h2>
        <ul>
          <li><strong>Public Roster:</strong> Athletes visible on your agency profile</li>
          <li><strong>Private Roster:</strong> Athletes only visible to colleges you contact</li>
          <li><strong>Featured Athletes:</strong> Highlight top prospects on your profile</li>
          <li><strong>Categories:</strong> Group athletes by sport, graduation year, or priority</li>
        </ul>
        
        <h2>Managing Athlete Profiles</h2>
        <p>Help your athletes maximize their presence:</p>
        <ul>
          <li>Review and suggest improvements to their profiles</li>
          <li>Upload highlight videos on their behalf (with permission)</li>
          <li>Update statistics and achievements</li>
          <li>Enhance their bios with professional writing</li>
          <li>Tag profiles with relevant keywords for searchability</li>
        </ul>
        
        <h2>Communication Tools</h2>
        <ul>
          <li><strong>Bulk Messaging:</strong> Send updates to groups of athletes</li>
          <li><strong>Activity Tracking:</strong> Monitor athlete engagement on the platform</li>
          <li><strong>Shared Calendar:</strong> Coordinate schedules and important dates</li>
          <li><strong>Document Sharing:</strong> Securely exchange contracts and materials</li>
        </ul>
        
        <h2>Reporting and Analytics</h2>
        <p>Track performance and engagement:</p>
        <ul>
          <li>Profile view statistics for each athlete</li>
          <li>College interest and interaction metrics</li>
          <li>Comparison tools to evaluate against similar athletes</li>
          <li>Market trend analysis for different sports and positions</li>
          <li>Recruitment progress tracking</li>
        </ul>
      `
    },
    { 
      id: 18, 
      title: 'Building college relationships', 
      description: 'Strategies for developing strong connections with college programs',
      views: 543,
      content: `
        <h1>Building College Relationships</h1>
        
        <p>Strong relationships with college programs are essential for successful athlete placement. Here's how to develop and maintain these important connections:</p>
        
        <h2>Identifying Target Programs</h2>
        <ul>
          <li>Research colleges that align with your athletes' academic and athletic profiles</li>
          <li>Consider factors like division level, location, and program history</li>
          <li>Follow college programs on HighLytr to stay updated on their activities</li>
          <li>Create lists of programs categorized by sport, region, and competitiveness</li>
        </ul>
        
        <h2>Making Initial Contact</h2>
        <p>Approach coaches professionally:</p>
        <ul>
          <li>Send personalized introduction messages through the HighLytr platform</li>
          <li>Briefly explain your agency's approach and specialization</li>
          <li>Mention any mutual connections or previous successful placements</li>
          <li>Offer value by sharing insights about the recruiting landscape</li>
          <li>Don't immediately push specific athletes in your first contact</li>
        </ul>
        
        <h2>Regular Engagement Strategies</h2>
        <ul>
          <li><strong>Periodic Check-ins:</strong> Reach out 2-3 times per season with relevant updates</li>
          <li><strong>Provide Value:</strong> Share useful information about upcoming tournaments or showcase events</li>
          <li><strong>Campus Visits:</strong> Schedule in-person meetings when traveling to their area</li>
          <li><strong>Athletic Events:</strong> Attend games and introduce yourself to coaching staff</li>
          <li><strong>Industry Conferences:</strong> Connect at coaching and recruiting conferences</li>
        </ul>
        
        <h2>Presenting Athletes Effectively</h2>
        <p>When recommending athletes to programs:</p>
        <ul>
          <li>Be selective and only suggest athletes who truly fit their needs</li>
          <li>Provide concise, relevant information focusing on their requirements</li>
          <li>Be honest about strengths and areas for improvement</li>
          <li>Include both athletic and academic information</li>
          <li>Make it easy to access videos and additional materials</li>
        </ul>
        
        <h2>Tracking Relationships</h2>
        <ul>
          <li>Document all interactions in the HighLytr CRM system</li>
          <li>Set reminders for follow-ups based on recruiting cycles</li>
          <li>Note coaching staff changes and adjust your contacts accordingly</li>
          <li>Record program preferences and recruitment patterns</li>
          <li>Analyze success rates with different programs to refine your approach</li>
        </ul>
      `
    }
  ],
  technical: [
    { 
      id: 19, 
      title: 'Troubleshooting login issues', 
      description: 'Solutions for common account access problems',
      views: 1876,
      content: `
        <h1>Troubleshooting Login Issues</h1>
        
        <p>Having trouble accessing your HighLytr account? Here are solutions for the most common login problems:</p>
        
        <h2>Forgotten Password</h2>
        <ol>
          <li>Visit the login page at <a href="/login">HighLytr.com/login</a></li>
          <li>Click the "Forgot password?" link below the login form</li>
          <li>Enter the email address associated with your account</li>
          <li>Check your email for a password reset link (check spam folders too)</li>
          <li>Follow the link to create a new password</li>
          <li>Use your new password to log in</li>
        </ol>
        
        <h2>Email Verification Issues</h2>
        <ul>
          <li><strong>Didn't receive verification email:</strong> Click "Resend verification email" on the login page</li>
          <li><strong>Verification link expired:</strong> Request a new verification email from the login page</li>
          <li><strong>Wrong email address:</strong> Contact support to update your email address</li>
        </ul>
        
        <h2>Account Locked</h2>
        <p>Your account may be temporarily locked after multiple failed login attempts:</p>
        <ul>
          <li>Wait 30 minutes before trying again</li>
          <li>Use the password reset option if you're unsure of your password</li>
          <li>Ensure you're using the correct email address</li>
          <li>Contact support if your account remains locked after these steps</li>
        </ul>
        
        <h2>Browser Issues</h2>
        <p>Try these troubleshooting steps:</p>
        <ul>
          <li>Clear your browser cache and cookies</li>
          <li>Try using a different browser (Chrome, Firefox, Safari)</li>
          <li>Disable browser extensions that might interfere with login</li>
          <li>Ensure your browser is updated to the latest version</li>
          <li>Check that JavaScript is enabled in your browser settings</li>
        </ul>
        
        <h2>Two-Factor Authentication Problems</h2>
        <ul>
          <li><strong>Lost access to authentication device:</strong> Use your backup codes provided during setup</li>
          <li><strong>Backup codes unavailable:</strong> Contact support with proof of identity</li>
          <li><strong>Incorrect time on authenticator app:</strong> Sync the time on your device</li>
        </ul>
        
        <h2>Still Having Issues?</h2>
        <p>If you've tried these solutions and still can't access your account, contact our support team:</p>
        <ul>
          <li>Email: support@highlytr.com</li>
          <li>Live chat: Available Monday-Friday, 9am-5pm EST</li>
          <li>Phone: 1-800-HIGHLYTR (available for premium accounts)</li>
        </ul>
      `
    },
    { 
      id: 20, 
      title: 'Using HighLytr on mobile devices', 
      description: 'Tips for getting the most out of the mobile app and responsive website',
      views: 1543,
      content: `
        <h1>Using HighLytr on Mobile Devices</h1>
        
        <p>Access HighLytr on the go with our mobile options. Here's how to get the best experience:</p>
        
        <h2>Mobile App Installation</h2>
        <ol>
          <li>Visit the App Store (iOS) or Google Play Store (Android)</li>
          <li>Search for "HighLytr"</li>
          <li>Tap "Install" or "Get"</li>
          <li>Open the app and log in with your existing credentials</li>
          <li>Enable notifications when prompted for important updates</li>
        </ol>
        
        <h2>Mobile App Features</h2>
        <ul>
          <li><strong>Profile Management:</strong> Update your profile and uploads on the go</li>
          <li><strong>Real-time Notifications:</strong> Receive alerts for messages and connections</li>
          <li><strong>Video Upload:</strong> Upload highlight clips directly from your phone</li>
          <li><strong>Quick Messaging:</strong> Chat with connections from anywhere</li>
          <li><strong>Offline Access:</strong> View saved profiles even without internet connection</li>
        </ul>
        
        <h2>Mobile Web Experience</h2>
        <p>If you prefer not to download the app:</p>
        <ul>
          <li>Visit HighLytr.com in your mobile browser</li>
          <li>Our responsive design adapts to your screen size</li>
          <li>Add to your home screen for quick access (tap share/menu, then "Add to Home Screen")</li>
          <li>Most features are available, though some advanced functions work best in the app</li>
        </ul>
        
        <h2>Optimizing Mobile Performance</h2>
        <ul>
          <li>Keep your app updated to the latest version</li>
          <li>Use Wi-Fi for uploading videos to avoid data charges</li>
          <li>Limit notifications to essential items for better battery life</li>
          <li>Clear the app cache periodically if performance slows</li>
          <li>Log out completely when using shared devices</li>
        </ul>
        
        <h2>Mobile-Specific Tips</h2>
        <ul>
          <li><strong>Quick Updates:</strong> Use the mobile app to post quick status updates from events</li>
          <li><strong>Location Services:</strong> Enable location for nearby event recommendations</li>
          <li><strong>Camera Integration:</strong> Take profile photos directly through the app</li>
          <li><strong>Voice Dictation:</strong> Use your phone's dictation for messaging coaches</li>
          <li><strong>Calendar Sync:</strong> Connect to your phone's calendar for recruitment events</li>
        </ul>
      `
    }
  ]
};
