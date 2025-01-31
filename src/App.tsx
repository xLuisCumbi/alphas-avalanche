import { useEffect, useState } from 'react'
import { useStore } from './store/useStore'
import { SearchBar } from './components/SearchBar'
import { ProjectCard } from './components/ProjectCard'
import './App.css'
import { ClipboardCopy } from 'lucide-react'
import { FilterGroup } from './components/FilterGroup'

function App() {
  const { projects: allProjects, setProjects, filteredProjects } = useStore()
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText('0x1f4604C7A7516d79dA580a82169a5084B34FBe19')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    fetch('/projects.json')
      .then(res => res.json())
      .then(projectsData => {
        console.log('Loaded projects:', projectsData);
        setProjects(projectsData)
      })
      .catch(error => {
        console.error('Error loading projects:', error);
      })
  }, [setProjects])

  const projects = filteredProjects()
  console.log('Filtered projects:', projects)
  const hasProjects = projects.length > 0

  return (
    <div className="min-h-screen p-6 flex flex-col">
      {/* Header Section */}
      <header className="flex items-center justify-between p-4 bg-avax-blue dark:bg-[#161617] rounded-lg shadow-lg mb-6">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-[#FF394A] dark:text-[#FF394A]">
          <img src="/assets/public/logo-red.svg" alt="AlphaHub Logo" className="w-8 h-8" />
          AlphaHub Space
        </h1>
        <div className="flex items-center">
          <span className="text-white mr-2">Support the project:</span>
          <div className="relative flex flex-col items-center bg-red-500/50 text-white border border-red-800 rounded-lg">
            <button
              onClick={copyAddress}
              className="flex items-center gap-2 bg-[#FF394A] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 active:scale-95 active:bg-opacity-100 transition-all duration-150 text-sm relative"
              title="Copy address"
            >
              <span>0x1f4604...FBe19</span>
              <ClipboardCopy size={16} />
            </button>
            {copied && (
              <span className="absolute -top-8 right-0 px-2 py-1 text-xs text-white bg-black rounded opacity-100 whitespace-nowrap">
                Copied!
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto flex-1 flex flex-col relative z-10">
        <div className="space-y-8 flex-1 mb-8">
          <div className="w-full">
            <SearchBar />
          </div>

          <div className="flex flex-col md:flex-row gap-6 flex-1">
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <FilterGroup />
              </div>
            </aside>

            <main className="flex-1 min-w-0 overflow-y-auto max-h-[80vh] p-4">
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
      </div>
      <footer className="sticky bottom-0 left-0 right-0 border-t border-white/10 pt-6 pb-4 bg-[#161617] mt-auto">
        <div className="text-center text-white text-sm">
          Made with <span className="text-[#FF394A]">❤️</span> by{' '}
          <a
            href="https://x.com/xLuisCumbi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF394A] hover:text-white transition-colors"
          >
            xLuisCumbi
          </a>
          {' - Member of '}
          <a
            href="https://x.com/ultravioletadao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF394A] hover:text-white transition-colors"
          >
            UltravioletaDAO
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
