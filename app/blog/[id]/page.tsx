import { Metadata } from 'next'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Facebook, Twitter, Linkedin } from 'lucide-react'

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "Annual Science Fair Winners Announced",
    content: `
      <p>We are thrilled to announce the winners of this year's Annual Science Fair! The event, which took place last week, showcased an impressive array of innovative projects from students across all grade levels.</p>
      
      <h2>Grand Prize Winner</h2>
      <p>The grand prize was awarded to Sarah Johnson, a 10th-grade student, for her project on "Harnessing Solar Energy through Improved Photovoltaic Cells". Sarah's project demonstrated a novel approach to increasing the efficiency of solar panels, potentially revolutionizing renewable energy technology.</p>
      
      <h2>Category Winners</h2>
      <ul>
        <li><strong>Environmental Science:</strong> Michael Chen (9th grade) - "Microplastic Filtration in Urban Water Systems"</li>
        <li><strong>Biology:</strong> Emma Rodriguez (11th grade) - "Gene Editing Techniques for Crop Resilience"</li>
        <li><strong>Chemistry:</strong> David Patel (12th grade) - "Catalytic Converters: Reducing Automobile Emissions"</li>
        <li><strong>Physics:</strong> Olivia Thompson (10th grade) - "Quantum Computing: Practical Applications in Data Security"</li>
      </ul>
      
      <p>We extend our heartfelt congratulations to all participants for their hard work, creativity, and scientific curiosity. The judges were impressed by the high caliber of projects presented this year, making the selection process particularly challenging.</p>
      
      <p>The winning projects will be displayed in the school's main hall for the next month, and we encourage everyone to take some time to explore these fascinating scientific endeavors.</p>
      
      <p>Once again, congratulations to our winners and all participants. Your dedication to scientific inquiry and innovation is truly inspiring!</p>
    `,
    author: "Jane Doe",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1564979268369-42032c5ca998?w=1000&q=80"
  },
  // Add more blog posts here...
]

// Mock data for comments
const initialComments = [
  { id: 1, author: "John Smith", content: "Congratulations to all the winners! The projects sound fascinating.", avatar: "JS" },
  { id: 2, author: "Emily Brown", content: "I'm so impressed by Sarah's solar energy project. Can't wait to see where this research leads!", avatar: "EB" },
]

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts.find(post => post.id.toString() === params.id)
  return {
    title: post ? `${post.title} | Cecati Blog` : 'Blog Post Not Found',
    description: post ? post.content.substring(0, 160) : 'This blog post could not be found.',
  }
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find(post => post.id.toString() === params.id)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="mb-4 text-gray-600">
        <span>{post.author}</span> • <span>{post.date}</span>
      </div>
      <Image 
        src={post.image} 
        alt={post.title} 
        width={1000} 
        height={500} 
        className="rounded-lg mb-6"
      />
      <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <div className="flex space-x-4 mb-8">
        <Button variant="outline" size="sm">
          <Facebook className="mr-2 h-4 w-4" /> Share
        </Button>
        <Button variant="outline" size="sm">
          <Twitter className="mr-2 h-4 w-4" /> Tweet
        </Button>
        <Button variant="outline" size="sm">
          <Linkedin className="mr-2 h-4 w-4" /> Share
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {initialComments.map(comment => (
          <div key={comment.id} className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.avatar}`} />
                <AvatarFallback>{comment.avatar}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{comment.author}</span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Leave a Comment</h3>
        <Textarea
          placeholder="Write your comment here..."
          className="mb-2"
        />
        <Button type="submit">Post Comment</Button>
      </div>
    </div>
  )
}