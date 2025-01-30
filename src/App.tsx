import { useEffect } from 'react'
import { useStore } from './store/useStore'
import { CategoryFilter } from './components/CategoryFilter'
import { SearchBar } from './components/SearchBar'
import { ProjectCard } from './components/ProjectCard'
import './App.css'
import { ClipboardCopy } from 'lucide-react'
import { FilterGroup } from './components/FilterGroup'

function App() {
  const { projects: allProjects, setProjects, filteredProjects } = useStore()

  const copyAddress = () => {
    navigator.clipboard.writeText('0x1f4604C7A7516d79dA580a82169a5084B34FBe19')
    // You might want to add a toast notification here
  }

  useEffect(() => {
    Promise.all([
      fetch('/projects.json').then(res => res.json()),
      fetch('/categories.json').then(res => res.json())
    ]).then(([projectsData, categoriesData]) => {
      setProjects(projectsData)
      // You might want to store categories in your state as well
    })
  }, [setProjects])

  const projects = filteredProjects()
  const hasProjects = projects.length > 0

  return (
    <div className="min-h-screen bg-ava-white dark:bg-ava-dark-gray p-6 flex flex-col">
      <div className="container mx-auto flex-1 flex flex-col">
        <div className="space-y-8 flex-1">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <img
              src="https://downloads.intercomcdn.com/i/o/573443/e4005e2ec01a0d47fc2307c3/c9589557fe23620722e438e1ca53793f.png"
              alt="Avalanche Logo"
              className="h-12"
            />
            <div className="flex items-center gap-4">
              <span className="text-ava-blue dark:text-ava-white text-sm">Support the project</span>
              <button
                onClick={copyAddress}
                className="flex items-center gap-2 bg-ava-blue text-ava-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm"
              >
                <span>0x1f4604...FBe19</span>
                <ClipboardCopy size={16} />
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-ava-blue dark:text-ava-white">
            Curated Avalanche Projects
          </h1>

          <div className="w-full">
            <SearchBar />
          </div>

          <div className="flex flex-col md:flex-row gap-6 flex-1">
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <FilterGroup />
              </div>
            </aside>

            <main className="flex-1 min-w-0">
              {hasProjects ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center min-w-[1000px] flex items-center justify-center">
                  <div className="space-y-3">
                    <p className="text-lg font-medium text-ava-blue dark:text-ava-white">
                      No projects found
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>

        <footer className="border-t border-ava-blue/10 dark:border-ava-white/10 pt-8 mt-12">
          <div className="text-center text-ava-blue dark:text-ava-white text-sm">
            Made with <span className="text-ava-red">❤️</span> by{' '}
            <a
              href="https://x.com/xLuisCumbi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ava-red hover:text-ava-blue dark:hover:text-ava-white transition-colors"
            >
              xLuisCumbi
            </a>
            {' & '}
            <a
              href="https://x.com/ultravioletadao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ava-red hover:text-ava-blue dark:hover:text-ava-white transition-colors"
            >
              UltravioletaDAO
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
