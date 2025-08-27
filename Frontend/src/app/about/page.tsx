import React from 'react'
import { Compass, Heart, Pencil } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Our Platform</h1>
          <p className="text-xl text-muted-foreground">
            Connecting creative minds and craft enthusiasts from around the world.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p>
            Founded in 2025, our platform was built with a singular vision: to create a thriving community where craft creators can showcase their work, connect with fans, and build sustainable creative businesses.
          </p>
          <p>
            We believe that handmade crafts and creative works carry stories, traditions, and innovations that deserve to be shared and celebrated. Our mission is to provide the tools and space for these stories to flourish.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-2">
                <Compass size={28} className="text-primary" />
              </div>
              <CardTitle className="text-center">Discover</CardTitle>
              <CardDescription className="text-center">
                Explore unique crafts from talented creators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Our curated marketplace features thousands of handcrafted items across dozens of categories, making it easy to find your next favorite piece.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-2">
                <Heart size={28} className="text-primary" />
              </div>
              <CardTitle className="text-center">Connect</CardTitle>
              <CardDescription className="text-center">
                Build meaningful relationships in our community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Follow your favorite creators, join discussions, and participate in virtual workshops to connect with like-minded craft enthusiasts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-2">
                <Pencil size={28} className="text-primary" />
              </div>
              <CardTitle className="text-center">Create</CardTitle>
              <CardDescription className="text-center">
                Share your craft with a global audience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Our creator tools make it simple to showcase your work, engage with fans, and grow your craft business on your own terms.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
          <p className="text-center mb-8">
            We're a passionate team of designers, developers, and craft enthusiasts dedicated to building the best platform for creators.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Muskan Gupta",
                role: "Founder & CEO",
                bio: "Former craft shop owner with a passion for supporting independent creators."
              },
              {
                name: "Shivansh Gupta",
                role: "Head of Community",
                bio: "Community builder focused on creating meaningful connections between creators and fans."
              },
              {
                name: "Chinmay Pandey",
                role: "Lead Developer",
                bio: "Tech enthusiast dedicated to building tools that make creators' lives easier."
              }
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-2 text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}