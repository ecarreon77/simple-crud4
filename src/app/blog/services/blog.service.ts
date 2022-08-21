import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  id:number = 4
  editedBlog : Blog[] | undefined
  addFlag = false;
  editFlag = false;
  blogs : Blog[] = [
    {id : 1,
      title: "A Life in Books",
      description: "Books importance",
      author: "Susan Osborne",
      comments:["Good work!!!",
                "Its so easy to do",
                "Wow!"]
    },
    {id : 2,
      title: "Paris Tour",
      description: "A walk in a beautiful ity of Paris ",
      author: "Justin Hammond",
      comments:["LOvely tour",
                "True life of a Parisian ",
              "Loving the vlog man keep it up!!"
            ]

    },
    {id : 3,
      title: "The Guardian's Books Blog",
      description: "True story of a guardian.",
      author: "Lolly Sy",
      comments:["Sentimental favorites",
                "Wonderful tribute.",
              "My heart ponded so fast"]
    },
  ];

  constructor(private http : HttpClient) { }

  getBlogs() : Observable<Blog[]>{
    return this.http.get<Blog[]>("http://localhost:3000/blogs").pipe(tap())
  }

  addBlogs(blog : Blog){
    return this.http.post("http://localhost:3000/blogs", blog)
  }

  delete(blog : Blog){
    return this.http.delete(`http://localhost:3000/blogs/${blog.id}`)
  }

  editBook(blog : Blog){
    return this.http.put(`http://localhost:3000/blogs/${blog.id}`, blog)
  }


// --------------------------------------------------------------------------------------
  // getBlogs(){
  //    return this.blogs

  // }

  // addBlogs(blog : Blog){
  //   blog.id = this.id
  //   this.id++
  //   this.blogs.push(blog)
  // }

  editBlogForm(id : number, blogs : Blog[]){
    this.editedBlog = blogs.filter((blog:Blog) =>{
      if(blog.id === id){
        return blog
      }
    })
    return this.editedBlog
}

// editBook(newBlog : Blog){
//   this.blogs.map(blog =>{
//    if(blog.id == newBlog.id){
//      blog.title = newBlog.title;
//      blog.description = newBlog.description;
//      blog.author = newBlog.author;
//      blog.comments = newBlog.comments;

//    }
//  })

// }

deleteAll(){
  return this.blogs = []
}

// delete(id : number){
//   this.blogs = this.blogs.filter(blog =>{
//     if(blog.id !== id){
//       return blog
//     }
//   })
//   return this.blogs
// }
}
