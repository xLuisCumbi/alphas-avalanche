import { useEffect, useState } from 'react'
import { useStore } from './store/useStore'
import { SearchBar } from './components/SearchBar'
import { ProjectCard } from './components/ProjectCard'
import './App.css'
import { ClipboardCopy, Search, Filter, X } from 'lucide-react'
import { FilterGroup } from './components/FilterGroup'

function App() {
  const { setProjects, filteredProjects } = useStore()
  const [copied, setCopied] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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
      {/* Header Section - Added z-index and overflow */}
      <header className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-avax-blue dark:bg-[#161617] rounded-lg shadow-lg mb-6 space-y-4 md:space-y-0 relative z-50 overflow-visible">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-3xl font-bold text-[#FF394A] dark:text-[#FF394A]">
            <img src="/assets/public/logo-red.svg" alt="AlphaHub Logo" className="w-8 h-8" />
            <span className="hidden md:inline">AlphaHub Space</span>
            <span className="md:hidden text-xl">AlphaHub</span>
          </h1>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-[#FF394A] transition-colors"
            >
              {isSearchOpen ? <X size={24} /> : <Search size={24} />}
            </button>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="text-white hover:text-[#FF394A] transition-colors"
            >
              {isFilterOpen ? <X size={24} /> : <Filter size={24} />}
            </button>
            <button
              onClick={copyAddress}
              className="text-white hover:text-[#FF394A] transition-colors relative"
            >
              <ClipboardCopy size={24} />
              {copied && (
                <span className="absolute -top-8 right-0 px-2 py-1 text-xs text-white bg-black rounded opacity-100 whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center">
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

      {/* Mobile Search Bar - Adjusted top position */}
      <div className={`md:hidden ${isSearchOpen ? 'block' : 'hidden'} absolute top-38 left-0 right-0 px-4 z-40`}>
        <SearchBar />
      </div>

      {/* Mobile Filters - Adjusted top position */}
      <div className={`md:hidden ${isFilterOpen ? 'block' : 'hidden'} absolute top-38 left-0 right-0 px-4 z-40`}>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <FilterGroup />
        </div>
      </div>

      {/* Main Content - Adjusted z-index */}
      <div className="container mx-auto flex-1 flex flex-col relative z-30">
        <div className="space-y-8 flex-1 mb-20">
          {/* Desktop Search */}
          <div className="hidden md:block w-full">
            <SearchBar />
          </div>

          <div className="flex flex-col md:flex-row gap-6 flex-1">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg sticky top-6">
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

      {/* Footer - Adjusted z-index */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-white/10 pt-6 pb-4 bg-[#161617] mt-auto z-20">
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
