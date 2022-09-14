import { useEffect, useState } from "react";
import Loader from "./components/loader";
import { Icon } from '@iconify/react';

const App = () => {

  const [loader, setLoader] = useState(false)
  const [flow, setFlow] = useState(1)
  const [fullname, setFullName] = useState("")
  const [displayname, setDisplayName] = useState("")
  const [workspacename, setWorkspaceName] = useState("")
  const [workspaceurl, setWorkspaceUrl] = useState("")
  const [type, setType] = useState("")

  const resetPage = () => {
    let ele = document.getElementById('input-flex')
    ele.classList.remove("max-h-0")
    ele.classList.add("max-h-[100vh]")
    setLoader(false)
    setFlow(1)
    setFullName("")
    setDisplayName("")
    setWorkspaceName("")
    setWorkspaceUrl("")
    setType("")
  }

  const handleError = (id) => {
    let input = document.getElementById(id)
    input.focus()
    input.classList.remove("focus:shadow-input")
    input.classList.add("shadow-inputError")
    setTimeout(() => {
      input.classList.add("focus:shadow-input")
      input.classList.remove("shadow-inputError")
    }, 4000)
  }

  useEffect(() => {
    const reset = (input) => {
      input.classList.add("focus:shadow-input")
      input.classList.remove("shadow-inputError")
    }

    if (flow === 1) {

      if (fullname !== "") {
        let input = document.getElementById('fullname')
        reset(input)
      }

      if (displayname !== "") {
        let input = document.getElementById('displayname')
        reset(input)
      }
    }

    if (workspacename !== "") {
      let input = document.getElementById('workspacename')
      reset(input)
    }
    // eslint-disable-next-line
  }, [fullname, displayname, workspacename])

  useEffect(() => {
    if (type !== "") {
      let error = document.getElementById('typeError')
      error.classList.add("translate-y-[5rem]")
      error.classList.remove("translate-y-0")
    }
  }, [type])

  const handleTypeError = () => {
    let error = document.getElementById('typeError')
    error.classList.remove("translate-y-[5rem]")
    error.classList.add("translate-y-0")
    setTimeout(() => {
      error.classList.add("translate-y-[5rem]")
      error.classList.remove("translate-y-0")
    }, 4000)
  }

  const handleFlow = () => {
    setLoader(true)
    if (flow === 1) {
      if (displayname === "") {
        handleError('displayname')
      }

      if (fullname === "") {
        handleError('fullname')
      }

      if (fullname !== "" && displayname !== "") {
        setFlow(2)
      }

      setLoader(false)
    } else if (flow === 2) {
      if (workspacename === "") {
        handleError('workspacename')
      }

      if (workspacename !== "") {
        setFlow(3)
      }

      setLoader(false)
    } else if (flow === 3) {
      if (type === "") {
        handleTypeError()
        setLoader(false)
      }

      if (type !== "") {
        let ele = document.getElementById('input-flex')
        ele.classList.add("max-h-0")
        ele.classList.remove("max-h-[100vh]")
        setTimeout(() => {
          setFlow(4)
          setLoader(false)
        }, 2000)
      }

    } else if (flow === 4) {
      resetPage()
    }
  }

  return (
    <div className="grid place-items-center w-screen h-screen">
      <div className="flex flex-col items-center p-4 w-[30rem] max-w-[calc(100vw_-_1rem)]">
        <div className="flex items-center mb-16">
          <img src="/icons/eden-logo.png" alt='logo' className="w-10 h-10 fill-primary" />
          <div className="text-3xl font-bold">Eden</div>
        </div>
        <div className="relative flex flex-row justify-between w-full overflow-hidden">
          <div className="absolute -z-10 top-1/2 left-[1.25rem] -translate-y-1/2 bg-neutral-300 w-[calc(100%_-_2.5rem)] h-[1px]" />
          <div className={`absolute -z-10 top-1/2 left-[1.25rem] -translate-y-1/2 bg-primary w-[calc(100%_-_2.5rem)] h-[1px]
          ${flow === 1
              ? "-translate-x-[calc(100%_*_5/6)]"
              : flow === 2
                ? "-translate-x-[calc(100%_*_3/6)]"
                : flow === 3
                  ? "-translate-x-[calc(100%_*_1/6)]"
                  : "-translate-x-0"
            }`} />
          <div className="h-8 w-8 text-sm font-semibold rounded-full grid place-items-center bg-primary text-white">1</div>
          <div className={`h-8 w-8 text-sm font-semibold rounded-full grid place-items-center
          ${flow > 1
              ? "bg-primary text-white"
              : "bg-white text-neutral-500 border-[1px] border-neutral-300"}`}>2</div>
          <div className={`h-8 w-8 text-sm font-semibold rounded-full grid place-items-center
          ${flow > 2
              ? "bg-primary text-white"
              : "bg-white text-neutral-500 border-[1px] border-neutral-300"}`}>3</div>
          <div className={`h-8 w-8 text-sm font-semibold rounded-full grid place-items-center
          ${flow > 3
              ? "bg-primary text-white"
              : "bg-white text-neutral-500 border-[1px] border-neutral-300"}`}>4</div>
        </div>
        <div className={`overflow-hidden grid place-items-center bg-primary rounded-full
            transistion-all duration-500
            ${flow === 4
            ? 'h-16 w-16 mt-16'
            : 'h-0 w-0 mt-0 scale-0'
          }`}>
          <Icon icon="charm:tick" className="text-white h-6 w-6" />
        </div>
        <div className="flex flex-col items-center my-10 w-[40rem] max-w-[calc(100vw_-_2rem)]">
          <div className="bold text-3xl font-bold text-center">
            {flow === 1
              ? "Welcome! First things first..."
              : flow === 2
                ? "Let's set up a home for all your work"
                : flow === 3
                  ? "How are you planing to use Eden?"
                  : `Congratulations, ${fullname}!`}
          </div>

          <div className="mt-1 text-neutral-500 text-sm text-center">
            {flow === 1
              ? "You can always change them later."
              : flow === 2
                ? "You can always create another workspace later."
                : flow === 3
                  ? "We'll streamline you setup experience accordingly."
                  : "You have completed onboarding, you can start using Eden!"}
          </div>
        </div>
        <div id="input-flex" className="w-full overflow-hidden max-h-[100vh]">
          {flow === 1
            ? // Profile input
            <div className="flex flex-col p-1 w-full max-w-[calc(30rem_-_2rem)] mb-4 text-neutral-500">
              <label className="mb-2 text-sm font-semibold">Full Name</label>
              <input
                id='fullname'
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Steve Jobs"
                className="text-neutral-800 border-[1px] rounded-md text-sm py-2 px-3 outline-none focus:shadow-input" />

              <label className="mt-6 mb-2 text-sm font-semibold">Display Name</label>
              <input
                id='displayname'
                value={displayname}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Steve"
                className="text-neutral-800 border-[1px] rounded-md text-sm py-2 px-3 outline-none focus:shadow-input" />
            </div>
            : flow === 2
              ?  // Workspace input
              <div className="slide-in flex flex-col p-1 w-full max-w-[calc(30rem_-_2rem)] mb-4 text-neutral-500">
                <label className="mb-2 text-sm font-semibold">Workspace Name</label>
                <input
                  id='workspacename'
                  value={workspacename}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Eden"
                  className="text-neutral-800 border-[1px] rounded-md text-sm py-2 px-3 outline-none focus:shadow-input" />

                <label className="mt-6 mb-2 text-sm font-semibold">
                  Workspace URL
                  <div className="inline ml-1 text-neutral-400">(optional)</div>
                </label>
                <div className="flex flex-row w-full">
                  <div className="py-2 px-3 border-[1px] border-r-0 rounded-l-md bg-neutral-100 text-sm text-neutral-400">
                    www.eden.com/
                  </div>
                  <input
                    id='workspaceurl'
                    value={workspaceurl}
                    onChange={(e) => setWorkspaceUrl(e.target.value)}
                    placeholder="Example"
                    className="text-neutral-800 border-[1px] flex-1 rounded-r-md text-sm py-2 px-3 outline-none focus:shadow-input" />
                </div>
              </div>
              : flow === 3
              && <div className="slide-in2 relative overflow-hidden flex flex-row flex-wrap gap-4 p-1 w-full max-w-[calc(30rem_-_2rem)] mb-4 text-neutral-500">
                <input
                  onChange={(e) => setType(e.target.value)}
                  type='radio'
                  name='type'
                  id='single'
                  value='single'
                  className='hidden' />
                <label htmlFor='single'
                  className={`flex flex-col w-full sm:w-[calc(50%_-_0.5rem)] p-6 pt-4 border-[1px] rounded-md cursor-pointer
                ${type === 'single'
                      ? "border-primary"
                      : "border-neutral-200"}`}>
                  <img src={`${type === 'single'
                    ? "/icons/single-primary.svg"
                    : "/icons/single.svg"}`}
                    alt='single'
                    className="h-12 w-12" />
                  <div className="font-bold text-black my-2">For myself</div>
                  <div>Write better. Think more clearly. Stay organized.</div>
                </label>
                <input
                  onChange={(e) => setType(e.target.value)}
                  type='radio'
                  name='type'
                  id='team'
                  value='team'
                  className='hidden' />
                <label htmlFor='team'
                  className={`flex flex-col w-full sm:w-[calc(50%_-_0.5rem)] p-6 pt-4 border-[1px] rounded-md cursor-pointer
                ${type === 'team'
                      ? "border-primary"
                      : "border-neutral-200"}`}>
                  <img src={`${type === 'team'
                    ? "/icons/team-primary.svg"
                    : "/icons/team.svg"}`}
                    alt='team' className="h-12 w-12" />
                  <div className="font-bold text-black my-2">With my team</div>
                  <div>Wikis, docs, tasks &amp; projects, all in one place.</div>
                </label>
                <div id='typeError' className="translate-y-[5rem] pointer-events-none absolute bottom-0 left-0 p-2 text-center text-sm bg-red-600 text-white w-full rounded-md">
                  Please select one of the above.
                </div>
              </div>}
        </div>

        <button
          onClick={handleFlow}
          className="grid place-items-center bg-primary text-neutral-100 text-[1rem] p-2 py-3 rounded-md min-w-full">
          {loader
            ? <Loader size={1.5} color={"white"} />
            : flow <= 2
              ? "Next"
              : flow === 3
                ? "Create Workspace"
                : "Launch Eden"
          }
        </button>
      </div>
    </div>
  );
}

export default App;