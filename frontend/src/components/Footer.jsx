function Footer() {
    let date = new Date().getFullYear();
    return (
        <footer className="bg-gray-700 text-white p-4 text-center text-ig md:text-3xl ig:text-4x1">
            <h1 className='mb-3'>{date} Static Eduacation - MERN Blog Application</h1>
            <p>All rights reserved.</p>
        </footer>
    )
}

export default Footer