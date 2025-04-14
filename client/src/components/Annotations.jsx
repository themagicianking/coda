import { useEffect, useState } from 'react'
import { NoteInput } from './NoteInput'
import { SongInfo } from './SongInfo'
export function Annotations() {
  const [orderNum, setOrderNum] = useState(0)
  const [song, setSong] = useState({})
  const [note, setNote] = useState('')
  const [hasPrevSong, setHasPrevSong] = useState(false)
  const [hasNextSong, setHasNextSong] = useState(false)

  const goToPrevSong = () => {
    const prevOrderNum = orderNum - 1
    setOrderNum(prevOrderNum)
  }

  const goToNextSong = () => {
    const nextOrderNum = orderNum + 1
    setOrderNum(nextOrderNum)
  }

  useEffect(() => {
    // when pulling from the server, figure out how to preserve newlines
    const sampleSong = {
      songID: 0,
      spotifyID: 19093,
      order: 0,
      artist: 'Indigo Girls',
      title: 'Closer to Fine',
      lyrics: `I'm trying to tell you something 'bout my life
      Maybe give me insight between black and white
      And the best thing you ever done for me
      Is to help me take my life less seriously
      It's only life after all, yeah
      Well, darkness has a hunger that's insatiable
      And lightness has a call that's hard to hear
      And I wrap my fear around me like a blanket
      I sailed my ship of safety till I sank it
      I'm crawling on your shores
      And I went to the doctor, I went to the mountains
      I looked to the children, I drank from the fountains
      There's more than one answer to these questions
      Pointing me in a crooked line
      And the less I seek my source for some definitive
      (The less I seek my source)
      Closer I am to fine, yeah
      Closer I am to fine, yeah
      And I went to see the doctor of philosophy
      With a poster of Rasputin and a beard down to his knee
      He never did marry or see a B-grade movie
      He graded my performance, he said he could see through me
      I spent four years prostrate to the higher mind
      Got my paper and I was free
      And I went to the doctor, I went to the mountains
      I looked to the children, I drank from the fountains
      There's more than one answer to these questions
      Pointing me in a crooked line
      And the less I seek my source for some definitive
      (The less I seek my source)
      Closer I am to fine, yeah
      Closer I am to fine, yeah
      I stopped by the bar at 3 A.M.
      To seek solace in a bottle or possibly a friend
      And I woke up with a headache like my head against a board
      Twice as cloudy as I'd been the night before
      And I went in seeking clarity
      I went to the doctor, I went to the mountains
      I looked to the children, I drank from the fountains
      We go to the doctor, we go to the mountains
      We look to the children, we drink from the fountain
      Yeah, we go to the Bible, we go through the workout
      We read up on revival, we stand up for the lookout
      There's more than one answer to these questions
      Pointing me in a crooked line
      And the less I seek my source for some definitive
      (The less I seek my source)
      Closer I am to fine
      Closer I am to fine
      Closer I am to fine, yeah`,
      note: "hi i'm a sample note"
    }
    const nextOrderNum = orderNum + 1
    const prevOrderNum = orderNum - 1

    if (prevOrderNum >= 0) {
      setHasPrevSong(true)
    }

    async function getSong() {
      try {
        // fetch song from server
        console.log('This is when the song will be fetched from the server.')
        console.log(`It should be #${orderNum} in order.`)
        setSong(sampleSong)
        setNote(sampleSong.note)
      } catch (error) {
        throw new Error(
          `Could not fetch song data from server. The following error occurred: ${error}`
        )
      }
    }

    async function updateNext() {
      try {
        console.log(
          `Checking to see if a song with order ${nextOrderNum} exists.`
        )
        console.log('If the get request returns true, set has next to true.')
        setHasNextSong(true)
      } catch (error) {
        throw new Error(
          `Could not check if next song exists. The following error occurred: ${error}`
        )
      }
    }

    getSong()
    updateNext()
  }, [orderNum])

  const updateNote = (newNote) => {
    setNote(newNote)
  }

  return (
    <>
      {/* this should link to selection page when routes are set up */}
      <a role="button">Previous</a>
      <SongInfo song={song} />
      <NoteInput note={note} updateNote={updateNote} />
      {hasPrevSong ? <a role="button" onClick={goToPrevSong}>Previous Song</a> : <></>}
      {hasNextSong ? <a role="button" onClick={goToNextSong}>Next Song</a> : <></>}
      {/* this should link to personalization page when routes are set up */}
      <a role="button">Next</a>
    </>
  )
}
