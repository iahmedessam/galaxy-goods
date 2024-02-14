import React from 'react'
import styles from './NotFound.module.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section class="dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">

          <h1 class="mb-4 opacity-10 text-9xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500 dark:text-white">
            404
          </h1>

          <p class="mb-4 text-3xl opacity-10 tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
          </p>

          <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>

          <button type='button' className="btn">
            <Link to="/" >Back to Home page</Link>
          </button>
        </div>
      </div>
    </section>
  )
}
